import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import "./LandingPage.css"; // Assuming styles will be added here.

const LandingPage = () => {
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
    alert('Thank you for your feedback!');
  };

  return (
    <Box
      sx={{ minHeight: '100vh', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}
      className="landing-page"
    >
      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h2" className="hero-title">
          Revolutionize Learning with EduExcel
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          Empower your learning journey with engaging quizzes and insights
        </Typography>
        <Box className="hero-buttons">
          <Button
            component={Link}
            to="/login"
            variant="contained"
            className="hero-button"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            className="hero-button"
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box className="features-section">
        <Typography variant="h4" className="section-title">Why EduExcel?</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-box">
              <img src="/icon-1.png" alt="Quizzes" className="feature-icon" />
              <Typography variant="h6" className="feature-title">Interactive Quizzes</Typography>
              <Typography variant="body1">
                Test your knowledge with engaging quizzes tailored to your curriculum.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-box">
              <img src="/icon-2.jpeg" alt="Progress" className="feature-icon" />
              <Typography variant="h6" className="feature-title">Track Your Progress</Typography>
              <Typography variant="body1">
                See how you're improving with detailed progress tracking.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="feature-box">
              <img src="/icon-3.jpg" alt="Learning" className="feature-icon" />
              <Typography variant="h6" className="feature-title">Personalized Learning</Typography>
              <Typography variant="body1">
                Get personalized feedback and insights to improve your learning.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Us Section */}
      <Box className="contact-section">
        <Typography variant="h4" className="section-title">Contact Us</Typography>
        <Typography variant="body1" className="section-description">
          Have feedback or questions? We'd love to hear from you.
        </Typography>
        <Box
          component="form"
          className="contact-form"
          onSubmit={handleContactSubmit}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={contactFormData.name}
            onChange={handleContactChange}
            margin="normal"
            className="form-input"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={contactFormData.email}
            onChange={handleContactChange}
            margin="normal"
            className="form-input"
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
            className="form-input"
          />
          <Button
            fullWidth
            variant="contained"
            className="submit-button"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box className="footer-section">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} EduExcel. All rights reserved.
        </Typography>
        <Box className="footer-links">
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link> | 
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;








