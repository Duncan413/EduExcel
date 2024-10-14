// src/pages/ClassResults.js 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Box, Typography, Grid, Card, CardContent } from '@mui/material';

const ClassResults = () => {
  const { classId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/class/${classId}/results`, {
          headers: { 'x-auth-token': token },
        });
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load results');
        setLoading(false);
      }
    };

    fetchResults();
  }, [classId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Class Results</Typography>
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{result.userId.name}</Typography>
                <Typography>{`Email: ${result.userId.email}`}</Typography>
                <Typography>{`Score: ${result.score}/${result.totalQuestions}`}</Typography>
                <Typography>{`Percentage: ${result.percentage}%`}</Typography>
                <Typography variant="body2" color="textSecondary">{`Quiz: ${result.quizId.title}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClassResults;

