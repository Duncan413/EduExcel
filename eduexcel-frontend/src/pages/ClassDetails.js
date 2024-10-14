import React, { useState, useEffect } from 'react'; 
import { Typography, List, ListItem } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ClassDetails = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/class/student/${classId}`, {
          headers: { 'x-auth-token': token },
        });
        setClassData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch class details');
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) return <Typography>Loading class details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Class: {classData.className}</Typography>
      <Typography variant="h6">Total Students: {classData.totalStudents}</Typography>

      <Typography variant="h6" gutterBottom>Quizzes:</Typography>
      <List>
        {classData.quizzes.map((quiz) => (
          <ListItem key={quiz.quizId}>
            {quiz.title} - {quiz.submitted ? 'Submitted' : 'Not Submitted'} {quiz.percentage ? `(${quiz.percentage}%)` : ''}
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default ClassDetails;






 




