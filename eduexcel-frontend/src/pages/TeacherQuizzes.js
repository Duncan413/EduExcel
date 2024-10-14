// src/pages/TeacherQuizzes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const TeacherQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [classes] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizRes = await axios.get('http://localhost:5000/api/quiz/my-quizzes', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        console.log('Teacher Quizzes:', quizRes.data); // Log teacher quizzes
        setQuizzes(quizRes.data.quizzes);
        // Fetch classes and other data here...
      } catch (error) {
        console.error('Error fetching quizzes or classes:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleAssign = async (quizId) => {
    if (!selectedClass) {
      alert('Please select a class to assign the quiz.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/class/${selectedClass}/assign-quizzes`, {
        quizIds: [quizId],
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      alert('Quiz assigned successfully!');
    } catch (error) {
      console.error('Error assigning quiz:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Quizzes
      </Typography>
      {quizzes.length === 0 ? (
        <Typography>No quizzes created yet.</Typography>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz._id} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h5">{quiz.title}</Typography>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select Class</em>
                </MenuItem>
                {classes.map((classItem) => (
                  <MenuItem key={classItem._id} value={classItem._id}>
                    {classItem.name}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={() => handleAssign(quiz._id)} variant="contained" color="primary">
                Assign to Class
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TeacherQuizzes;
