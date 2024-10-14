// src/pages/TeacherDashboard.js
import React from 'react';
import Layout from '../components/Layout'; 
import { Typography, Box, Button } from '@mui/material';

const TeacherDashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Teacher Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          As a teacher, you can create quizzes, assign them to classes, and view students' progress.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Create New Quiz
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
          View Class Results
        </Button>
      </Box>
    </Layout>
  );
};

export default TeacherDashboard;
