// src/pages/Feedback.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

const Feedback = () => {
  const { resultId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/quiz/feedback/${resultId}`, {
          headers: { 'x-auth-token': token },
        });
        setFeedbackData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load feedback');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [resultId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>{`Feedback for ${feedbackData.quizTitle}`}</Typography>
      <Typography variant="h6">{`Score: ${feedbackData.score}/${feedbackData.totalQuestions}`}</Typography>
      <Typography>{`Percentage: ${feedbackData.percentage}%`}</Typography>

      {feedbackData.feedback.map((item, index) => (
        <Box key={index} sx={{ marginTop: 2, padding: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Typography variant="h6">{item.questionText}</Typography>
          <Typography variant="body1" color={item.isCorrect ? 'green' : 'red'}>
            {`Your Answer: ${item.selectedAnswer}`}
          </Typography>
          {!item.isCorrect && (
            <Typography variant="body2" color="textSecondary">{`Correct Answer: ${item.correctAnswer}`}</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Feedback;


