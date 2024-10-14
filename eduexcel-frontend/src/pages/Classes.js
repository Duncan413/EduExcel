// src/pages/Classes.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Typography, Grid, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Fetch the user role
        const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 'x-auth-token': token },
        });
        setRole(userResponse.data.role);

        let response;
        if (userResponse.data.role === 'teacher') {
          response = await axios.get('http://localhost:5000/api/class/teacher', {
            headers: { 'x-auth-token': token },
          });
        } else if (userResponse.data.role === 'student') {
          response = await axios.get('http://localhost:5000/api/class/student', {
            headers: { 'x-auth-token': token },
          });
        }

        setClasses(response.data.classes);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch classes');
        setLoading(false);
      }
    };

    fetchClasses();
  }, [role]);

  return (
    <Layout>
      <Box sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {role === 'teacher' ? 'My Classes' : 'Available Classes'}
        </Typography>

        {role === 'teacher' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/create-class')}
            sx={{ marginBottom: 2 }}
          >
            Create Class
          </Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && classes.length === 0 && <Typography>No classes available at the moment.</Typography>}

        <Grid container spacing={2}>
          {classes.map((classItem) => (
            <Grid item xs={12} sm={6} md={4} key={classItem._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{classItem.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Students: ${classItem.students.length} | Quizzes: ${classItem.quizzes.length}`}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(role === 'student' ? `/class/${classItem._id}` : `/manage-class/${classItem._id}`)}
                    sx={{ marginTop: 1 }}
                  >
                    {role === 'student' ? 'View Class' : 'Manage Class'}
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

export default Classes;



