import React, { useState } from 'react';
import Layout from '../components/Layout'; 
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (response.data.role === 'teacher') {
        navigate('/dashboard/teacher');
      } else if (response.data.role === 'student') {
        navigate('/dashboard/student');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Full viewport height
          p: 2,
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            p: 5, 
            width: 450, // Larger width for the form
            borderRadius: 3, // Smoother edges for a modern feel
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Login to EduExcel
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              size="medium" // Slightly larger input field
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              size="medium"
            />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, py: 1.5 }} type="submit">
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Login;





