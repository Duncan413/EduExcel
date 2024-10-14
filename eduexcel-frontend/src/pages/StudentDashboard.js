// src/pages/StudentDashboard.js
import React from 'react';
import Layout from '../components/Layout'; 
import { Typography, Box, Button } from '@mui/material';

const StudentDashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          As a student, you can take quizzes and view your progress.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Take Quiz
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
          View Progress
        </Button>
      </Box>
    </Layout>
  );
};

export default StudentDashboard;
