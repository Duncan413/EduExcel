// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import Layout from '../components/Layout'; 
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      // Redirect to login if no token found
      navigate('/login');
    } else if (role === 'student') {
      // Redirect student to student-specific dashboard (you can modify this if needed)
      navigate('/dashboard/student');
    }
    // You can add other role checks (admin, teacher) if needed here
  }, [navigate]);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Welcome to Your Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Here you can manage your quizzes, view progress, and manage your classes.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Manage Quizzes
        </Button>
      </Box>
    </Layout>
  );
};

export default Dashboard;



