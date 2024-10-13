// routes/quiz.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
const Quiz = require('../models/Quiz'); // Import the quiz model 
const Class = require('../models/Class');
const Result = require('../models/Result'); // Ensure the correct path to the Result model

// Create quiz route, only accessible to "teacher" and "admin"
router.post('/create', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const newQuiz = new Quiz({
            title,
            description,
            createdBy: req.user.email,
            questions // An array of questions with correct answers
        });

        const savedQuiz = await newQuiz.save();
        res.status(201).json({ msg: 'Quiz created successfully', savedQuiz });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// Fetch all quizzes
router.get('/', auth, (req, res) => {
    // Simulate fetching from the database
    const quizzes = [
        { id: '1', title: 'Quiz 1', description: 'Description for quiz 1' },
        { id: '2', title: 'Quiz 2', description: 'Description for quiz 2' }
    ];

    res.json(quizzes);
});

// List all quizzes created by the logged-in teacher or admin
router.get('/my-quizzes', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
    try {
        const quizzes = await Quiz.find({ createdBy: req.user.email });
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// List all quizzes (accessible to everyone)
router.get('/all-quizzes', auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// routes/quiz.js (Get All Quizzes for Student with Submission Status)
router.get('/student-quizzes', auth, roleMiddleware(['student']), async (req, res) => {
    try {
      const studentId = req.user.id;
  
      // Fetch classes the student is part of
      const classes = await Class.find({ students: studentId }).select('quizzes');
  
      // Extract quiz IDs from the classes
      const quizIds = classes.flatMap(classData => classData.quizzes);
  
      // Fetch all quizzes assigned to the student's classes
      const quizzes = await Quiz.find({ _id: { $in: quizIds } });
  
      // Check submission status for each quiz
      const quizzesWithStatus = await Promise.all(quizzes.map(async quiz => {
        const result = await Result.findOne({ userId: studentId, quizId: quiz._id });
        return {
          ...quiz.toObject(),
          submitted: !!result  // Check if the student has submitted this quiz
        };
      }));
  
      res.status(200).json({ quizzes: quizzesWithStatus });
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching quizzes for student', error: error.message });
    }
  });
  

// Fetch quiz history for the logged-in student
router.get('/history', auth, async (req, res) => {
    try {
        // Find all results for the current logged-in user (student)
        const results = await Result.find({ userId: req.user.id }).populate('quizId', 'title description');
        
        if (!results.length) {
            return res.status(404).json({ msg: 'No quiz history found for this user' });
        }

        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get quiz details by ID (accessible to everyone)
router.get('/:quizId', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a quiz by ID, accessible only to "teacher" (who created the quiz) and "admin"
router.delete('/:quizId', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        // Check if the user is either the quiz creator or an admin
        if (quiz.createdBy !== req.user.email && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        await Quiz.findByIdAndDelete(req.params.quizId);

        res.json({ msg: 'Quiz deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update quiz route (only accessible to the creator of the quiz - teacher/admin)
router.put('/update/:quizId', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
    const { quizId } = req.params;
    const { title, description, questions } = req.body; // Fields that can be updated

    try {
        // Find the quiz by ID and check if the logged-in user is the creator
        let quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        // Check if the logged-in user is the creator of the quiz
        if (quiz.createdBy !== req.user.email) {
            return res.status(403).json({ msg: 'You do not have permission to update this quiz' });
        }

        // Update the quiz fields
        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;
        quiz.questions = questions || quiz.questions;

        // Save the updated quiz
        const updatedQuiz = await quiz.save();

        res.json({ msg: 'Quiz updated successfully', updatedQuiz });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Save quiz results after submission
router.post('/submit/:quizId', auth, async (req, res) => {
    try {
        const { answers } = req.body; // Get submitted answers

        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        let score = 0;

        // Create an array to store the student's answers along with question IDs
        const resultAnswers = answers.map((answer) => {
            const question = quiz.questions.find(
                (q) => q._id.toString() === answer.questionId
            );

            if (!question) {
                return res.status(400).json({ msg: 'Question not found' });
            }

            // Check if the answer is correct
            const isCorrect = question.correctAnswer === answer.selectedAnswer;
            if (isCorrect) {
                score++;
            }

            return {
                questionId: question._id,
                selectedAnswer: answer.selectedAnswer
            };
        });

        const totalQuestions = quiz.questions.length;
        const percentage = (score / totalQuestions) * 100;

        // Save the result
        const result = new Result({
            userId: req.user.id,
            quizId: quiz._id,
            score,
            totalQuestions,
            percentage,
            answers: resultAnswers // Store the answers array
        });

        await result.save();

        res.json({
            msg: 'Quiz submitted successfully',
            score,
            totalQuestions,
            percentage
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Fetch quiz result with detailed feedback
router.get('/feedback/:resultId', auth, async (req, res) => {
    try {
        // Find the result by its ID and populate quiz details
        const result = await Result.findById(req.params.resultId)
            .populate('quizId', 'questions title description');

        if (!result) {
            return res.status(404).json({ msg: 'Result not found' });
        }

        // Ensure the result has answers
        if (!result.answers || result.answers.length === 0) {
            return res.status(400).json({ msg: 'No answers found for this result' });
        }

        const feedback = result.quizId.questions.map((question) => {
            // Find the student's selected answer for the current question
            const userAnswer = result.answers.find(
                (ans) => ans.questionId.toString() === question._id.toString()
            );

            return {
                questionText: question.questionText,
                correctAnswer: question.correctAnswer,
                selectedAnswer: userAnswer ? userAnswer.selectedAnswer : null,
                isCorrect: userAnswer ? userAnswer.selectedAnswer === question.correctAnswer : false
            };
        });

        res.json({
            quizTitle: result.quizId.title,
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: result.percentage,
            feedback
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;

