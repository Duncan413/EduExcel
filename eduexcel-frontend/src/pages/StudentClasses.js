// src/pages/StudentClasses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/class/student', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setClasses(response.data.classes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student classes:', error);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Classes
      </Typography>
      {classes.length === 0 ? (
        <Typography>No classes assigned yet.</Typography>
      ) : (
        classes.map((classItem) => (
          <Card key={classItem._id} style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h5">{classItem.name}</Typography>
              <Typography>Quizzes Assigned: {classItem.quizzes.length}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentClasses;
