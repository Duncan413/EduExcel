// src/pages/QuizDetails.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Typography, Card, CardContent, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}`, {
          headers: { 'x-auth-token': token },
        });

        setQuiz(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quiz details');
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (loading) return <Typography variant="h6">Loading quiz details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!quiz) return <Typography>No quiz found.</Typography>;

  return (
    <Layout>
      <Grid container justifyContent="center" spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card elevation={3} sx={{ borderRadius: '15px', background: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                {quiz.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {quiz.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Questions:
              </Typography>
              <Paper elevation={1} sx={{ padding: 2, background: '#fff', borderRadius: '10px', mb: 3 }}>
                {quiz.questions.map((question, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    {index + 1}. {question.questionText} <br />
                    <strong>Correct Answer:</strong> {question.correctAnswer}
                  </Typography>
                ))}
              </Paper>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/dashboard/quizzes')}
                sx={{ marginTop: 2 }}
              >
                Back to Quizzes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default QuizDetails;


