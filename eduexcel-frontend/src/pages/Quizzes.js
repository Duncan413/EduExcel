// src/pages/Quizzes.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Typography, Grid, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState(''); // New state for user role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Fetch user role
        const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 'x-auth-token': token },
        });
        setRole(userResponse.data.role); // Assuming the role is returned in the response

        if (userResponse.data.role === 'teacher') {
          // Fetch quizzes created by the teacher
          const response = await axios.get('http://localhost:5000/api/quiz/my-quizzes', {
            headers: {
              'x-auth-token': token,
            },
          });
          setQuizzes(response.data);
        } else if (userResponse.data.role === 'student') {
          // Fetch quizzes available for students
          const response = await axios.get('http://localhost:5000/api/quiz/all-quizzes', {
            headers: {
              'x-auth-token': token,
            },
          });
          setQuizzes(response.data);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quizzes');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [role]); // Dependency on role

  return (
    <Layout>
      <Box sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {role === 'teacher' ? 'My Quizzes' : 'Available Quizzes'}
        </Typography>
        
        {role === 'teacher' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create-quiz')}
            sx={{ marginBottom: 2 }}
          >
            Create Quiz
          </Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && quizzes.length === 0 && <Typography>No quizzes available at the moment.</Typography>}

        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{quiz.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {quiz.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(role === 'student' ? `/take-quiz/${quiz._id}` : `/quiz/${quiz._id}`)}
                    sx={{ marginTop: 1 }}
                  >
                    {role === 'student' ? 'Take Quiz' : 'View Quiz'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Quizzes;





