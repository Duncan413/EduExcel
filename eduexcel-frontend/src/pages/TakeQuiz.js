// src/pages/TakeQuiz.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress, Button, RadioGroup, FormControlLabel, Radio, Paper, Box, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TakeQuiz = () => {
  const { quizId } = useParams(); // Extract quizId from the URL
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({}); // To store user's selected answers
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        setQuiz(response.data); // Set the quiz data
        setLoading(false);      // Stop loading
      } catch (err) {
        console.error(err);
        setError('Failed to load the quiz');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswer
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/quiz/submit/${quizId}`, 
        { answers: Object.keys(answers).map(qId => ({ questionId: qId, selectedAnswer: answers[qId] })) },
        { headers: { 'x-auth-token': token } }
      );

      // Provide feedback to the user
      setSuccessMessage('Quiz submitted successfully!');
      setOpenSnackbar(true);
      navigate('/dashboard'); // Redirect to the dashboard or results page
    } catch (err) {
      console.error(err);
      setError('Failed to submit the quiz');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
        <Typography variant="body1" paragraph>{quiz.description}</Typography>

        {/* Displaying quiz questions and answer options */}
        {quiz.questions && quiz.questions.map((question) => (
          <Box key={question._id} sx={{ mb: 3 }}>
            <Typography variant="h6">{question.questionText}</Typography>
            <RadioGroup onChange={(e) => handleAnswerChange(question._id, e.target.value)}>
              {question.options.map((option, i) => (
                <FormControlLabel 
                  key={i} 
                  control={<Radio />} 
                  label={option} 
                  value={option} 
                />
              ))}
            </RadioGroup>
          </Box>
        ))}

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          sx={{ mt: 2 }}
        >
          Submit Quiz
        </Button>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TakeQuiz;


 

