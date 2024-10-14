// src/pages/AdminDashboard.js
import React from 'react';
import Layout from '../components/Layout'; 
import { Typography, Box, Button } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          As an admin, you can manage users, quizzes, and overall platform settings.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Manage Users
        </Button>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;
