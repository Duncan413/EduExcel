// src/pages/StudentQuizzes.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz/student-quizzes', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        console.log('Student Quizzes:', response.data); // Log student quizzes
        setQuizzes(response.data.quizzes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student quizzes:', error);
      }
    };
  
    fetchQuizzes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Quizzes
      </Typography>
      {quizzes.length === 0 ? (
        <Typography>No quizzes assigned yet.</Typography>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz._id} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h5">{quiz.title}</Typography>
              <Typography>Submission Status: {quiz.submitted ? 'Submitted' : 'Not Submitted'}</Typography>
              {!quiz.submitted && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/student/take-quiz/${quiz._id}`)}
                >
                  Take Quiz
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentQuizzes;
