const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
const QuizResult = require('../models/Result');

// Route: Create a new class (only teachers or admins can create)
router.post('/create', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.user.id;

    const newClass = new Class({
      name,
      teacher: teacherId,
    });

    await newClass.save();
    res.status(201).json({ msg: 'Class created successfully', newClass });
  } catch (error) {
    res.status(500).json({ msg: 'Error creating class', error: error.message });
  }
});

// Route: Add students to a class (only teachers or admins)
router.put('/:classId/add-students', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
  try {
    const { classId } = req.params;
    const { studentIds } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { students: { $each: studentIds } } },
      { new: true }
    );

    res.status(200).json({ msg: 'Students added successfully', updatedClass });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding students', error: error.message });
  }
});

// Route: Assign quizzes to a class (only teachers or admins)
router.put('/:classId/assign-quizzes', auth, roleMiddleware(['teacher', 'admin']), async (req, res) => {
  try {
    const { classId } = req.params;
    const { quizIds } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { quizzes: { $each: quizIds } } },
      { new: true }
    );

    res.status(200).json({ msg: 'Quizzes assigned successfully', updatedClass });
  } catch (error) {
    res.status(500).json({ msg: 'Error assigning quizzes', error: error.message });
  }
});

// Route: Get all classes for a teacher
router.get('/teacher', auth, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const teacherId = req.user.id;
    const classes = await Class.find({ teacher: teacherId }).populate('students quizzes');

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching classes', error: error.message });
  }
});

// Route: Get all classes for a student
router.get('/student', auth, roleMiddleware(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    const classes = await Class.find({ students: studentId }).populate('quizzes');

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching classes', error: error.message });
  }
});


// Route: Get class details for a teacher
router.get('/:classId', auth, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const classId = req.params.classId;

    // Fetch the class data and populate quizzes and students
    const classData = await Class.findById(classId).populate('quizzes students');
    if (!classData) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    res.status(200).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Route: Get class details for a student
router.get('/student/:classId', auth, roleMiddleware(['student']), async (req, res) => {
  try {
    const classId = req.params.classId;
    
    // Fetch the class data and populate quiz and student results
    const classData = await Class.findById(classId).populate('quizzes');
    if (!classData) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    const quizResults = await QuizResult.find({
      quizId: { $in: classData.quizzes },
      userId: req.user.id // Only fetch results for the logged-in student
    });

    const resultsWithStatus = classData.quizzes.map(quiz => {
      const result = quizResults.find(r => r.quizId.toString() === quiz._id.toString());
      return {
        quizId: quiz._id,
        title: quiz.title,
        submitted: !!result, // true if submitted, false otherwise
        percentage: result ? result.percentage : null // Fetch percentage if available
      };
    });

    res.status(200).json({
      className: classData.name,
      totalStudents: classData.students.length,
      quizzes: resultsWithStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// Route to get all students' quiz results for a specific class
router.get('/:classId/results', auth, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const classId = req.params.classId;

    // Find all quizzes assigned to this class and include their details
    const classData = await Class.findById(classId).populate('quizzes');
    
    if (!classData) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    // Find all quiz results for the quizzes assigned to this class and populate student and quiz info
    const quizResults = await QuizResult.find({
      quizId: { $in: classData.quizzes }
    })
    .populate('userId', 'email name') // Populate student info
    .populate('quizId', 'title'); // Populate quiz info, including the title

    res.status(200).json(quizResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


module.exports = router;
