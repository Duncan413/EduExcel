import React, { useState } from 'react';
import { Typography, Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const CreateClass = () => {
  const [className, setClassName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateClass = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/class/create',
        { name: className },
        { headers: { 'x-auth-token': token } }
      );
      setMessage('Class created successfully!');
      setClassName('');
      // Show success message
      setOpenSnackbar(true);
      // Redirect back to the Classes page after a short delay
      setTimeout(() => {
        navigate('/classes');
      }, 2000);
    } catch (err) {
      setMessage('Error creating class');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#f0f4f8',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 600,
          margin: 'auto', // Center the form
          marginTop: 15,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create a New Class
        </Typography>

        <Box component="form" sx={{ marginBottom: 2 }}>
          <TextField
            label="Class Name"
            variant="outlined"
            fullWidth
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCreateClass}>
            Create Class
          </Button>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={message.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default CreateClass;


