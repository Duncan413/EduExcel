import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ManageClass = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/class/${classId}`, {
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

  const handleOpen = async () => {
    setOpen(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/quiz/my-quizzes', {
        headers: { 'x-auth-token': token },
      });
      setQuizzes(response.data);
    } catch (err) {
      setError('Failed to fetch quizzes');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuizzes([]); // Reset selected quizzes when closing
  };

  const handleCheckboxChange = (quizId) => {
    setSelectedQuizzes((prevSelected) =>
      prevSelected.includes(quizId)
        ? prevSelected.filter((id) => id !== quizId)
        : [...prevSelected, quizId]
    );
  };

  const handleAssignQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/class/${classId}/assign-quizzes`, {
        quizIds: selectedQuizzes,
      }, {
        headers: { 'x-auth-token': token },
      });
      alert('Quizzes assigned successfully!');
      handleClose(); // Close the modal after successful assignment
    } catch (error) {
      setError('Error assigning quizzes: ' + error.message);
    }
  };

  if (loading) return <Typography>Loading class details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const students = classData?.students || [];

  return (
    <Layout>
      <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 , marginTop: 15}}>
        <Typography variant="h4" gutterBottom align="center">
          Manage Class: {classData.name}
        </Typography>

        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Students:
          </Typography>
          <List>
            {students.length > 0 ? (
              students.map((student) => (
                <ListItem key={student._id} sx={{ paddingLeft: 0 }}>
                  {student.name}
                </ListItem>
              ))
            ) : (
              <ListItem>No students enrolled</ListItem>
            )}
          </List>
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quizzes:
          </Typography>
          <List>
            {classData.quizzes.length > 0 ? (
              classData.quizzes.map((quiz) => (
                <ListItem key={quiz._id} sx={{ paddingLeft: 0 }}>
                  {quiz.title}
                </ListItem>
              ))
            ) : (
              <ListItem>No quizzes assigned</ListItem>
            )}
          </List>
        </Paper>

        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginTop: 2 }}>
            Assign Quiz
          </Button>
        </Box>

        {/* Modal for selecting quizzes */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Assign Quizzes</DialogTitle>
          <DialogContent>
            {quizzes.map((quiz) => (
              <FormControlLabel
                key={quiz._id}
                control={
                  <Checkbox
                    checked={selectedQuizzes.includes(quiz._id)}
                    onChange={() => handleCheckboxChange(quiz._id)}
                  />
                }
                label={quiz.title}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAssignQuiz} color="primary">
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default ManageClass;

