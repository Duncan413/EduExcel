import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', correctAnswer: '', options: ['', '', '', ''] }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', correctAnswer: '', options: ['', '', '', ''] }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/quiz/create',
        { title, description, questions },
        { headers: { 'x-auth-token': token } }
      );
      navigate('/dashboard/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
      setOpenSnackbar(true); // Show error snackbar on error
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Layout>
      <Box sx={{ padding: 4, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Quiz Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
            variant="outlined"
          />
          <TextField
            label="Description"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
            variant="outlined"
            multiline
            rows={3} // Added multiline for better description input
          />

          {questions.map((question, index) => (
            <Paper key={index} elevation={2} sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>Question {index + 1}</Typography>
              <TextField
                label="Question Text"
                fullWidth
                required
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                sx={{ marginBottom: 1 }}
                variant="outlined"
              />
              <TextField
                label="Correct Answer"
                fullWidth
                required
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                sx={{ marginBottom: 1 }}
                variant="outlined"
              />
              {question.options.map((option, optionIndex) => (
                <TextField
                  key={optionIndex}
                  label={`Option ${optionIndex + 1}`}
                  fullWidth
                  required
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  sx={{ marginBottom: 1 }}
                  variant="outlined"
                />
              ))}
            </Paper>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Button variant="contained" color="secondary" onClick={addQuestion}>
              Add Question
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Create Quiz
            </Button>
          </Box>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Error creating quiz. Please try again!
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default CreateQuiz;

