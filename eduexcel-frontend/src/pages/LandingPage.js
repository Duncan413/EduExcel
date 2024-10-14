import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // State for handling contact form submissions
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log(contactFormData);
    // Here, you could add API calls to handle form submission.
    // For now, it just logs the form data.
    alert('Thank you for your feedback!');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', textAlign: 'center' }}>
      {/* Hero Section */}
      <Box sx={{ py: 6, backgroundColor: '#1976d2', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" gutterBottom>
          The Future You Is a Test Acer with EduExcel
        </Typography>
        <Typography variant="h5" gutterBottom>
          Empower your learning journey with quizzes, classes, and progress tracking
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{ 
              mx: 1, 
              px: 3, 
              py: 1, 
              color: 'orange', 
              borderColor: 'orange', 
              '&:hover': {
                backgroundColor: 'orange',
                color: 'white',
              }
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            sx={{ 
              mx: 1, 
              px: 3, 
              py: 1, 
              color: 'orange', 
              borderColor: 'orange', 
              '&:hover': {
                backgroundColor: 'orange',
                color: 'white',
              }
            }}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, backgroundColor: '#fff' }}>
        <Typography variant="h4" gutterBottom>Why EduExcel?</Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ px: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Interactive Quizzes</Typography>
              <Typography variant="body1">
                Test your knowledge with engaging quizzes tailored to your curriculum.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Track Your Progress</Typography>
              <Typography variant="body1">
                See how you're improving with detailed progress tracking.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Personalized Learning</Typography>
              <Typography variant="body1">
                Get personalized feedback and insights to improve your learning.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box sx={{ py: 6, backgroundColor: '#f4f6f8', mt: 34 }}>
        <Typography variant="h4" gutterBottom>Contact Us</Typography>
        <Typography variant="body1" gutterBottom>
          Have feedback or questions? We'd love to hear from you.
        </Typography>
        <Box
          component="form"
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mt: 4,
            p: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
          }}
          onSubmit={handleContactSubmit}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={contactFormData.name}
            onChange={handleContactChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={contactFormData.email}
            onChange={handleContactChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={contactFormData.message}
            onChange={handleContactChange}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box sx={{ py: 2, backgroundColor: '#1976d2', color: '#fff', mt: 6 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} EduExcel. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;




