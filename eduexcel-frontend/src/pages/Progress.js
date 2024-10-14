// src/pages/Progress.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Typography, Grid, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Progress = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentResults, setStudentResults] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressData = async () => {
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
        setRole(userResponse.data.role);

        if (userResponse.data.role === 'student') {
          // Fetch student's quiz results
          const resultResponse = await axios.get('http://localhost:5000/api/quiz/history', {
            headers: { 'x-auth-token': token },
          });
          setStudentResults(resultResponse.data);
        } else if (userResponse.data.role === 'teacher') {
          // Fetch teacher's classes
          const classResponse = await axios.get('http://localhost:5000/api/class/teacher', {
            headers: { 'x-auth-token': token },
          });
          setTeacherClasses(classResponse.data.classes);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch progress data');
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [role]);

  return (
    <Layout>
      <Box sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Progress Tracking
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Typography color="error">{error}</Typography>}

        {/* Student View */}
        {role === 'student' && (
          <>
            <Typography variant="h5">My Quiz Results</Typography>
            {studentResults.length === 0 ? (
              <Typography>No quiz results found.</Typography>
            ) : (
              <Grid container spacing={2}>
                {studentResults.map((result) => (
                  <Grid item xs={12} sm={6} md={4} key={result._id}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{result.quizId.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Score: {result.score}/{result.totalQuestions} ({result.percentage}%)
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/feedback/${result._id}`)}
                          sx={{ marginTop: 1 }}
                        >
                          View Feedback
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* Teacher View */}
        {role === 'teacher' && (
          <>
            <Typography variant="h5">My Classes</Typography>
            {teacherClasses.length === 0 ? (
              <Typography>No classes found.</Typography>
            ) : (
              <Grid container spacing={2}>
                {teacherClasses.map((classItem) => (
                  <Grid item xs={12} sm={6} md={4} key={classItem._id}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{classItem.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Students: {classItem.students.length} | Quizzes: {classItem.quizzes.length}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/class/${classItem._id}/results`)}
                          sx={{ marginTop: 1 }}
                        >
                          View Results
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Progress;


