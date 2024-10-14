import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage'; 
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Overview from './pages/Overview';
import Quizzes from './pages/Quizzes';
import Progress from './pages/Progress';
import Classes from './pages/Classes';
import ClassDetails from './pages/ClassDetails';
import CreateClass from './pages/CreateClass';
import ManageClass from './pages/ManageClass';
import TakeQuiz from './pages/TakeQuiz';
import QuizDetails from './pages/QuizDetails';
import CreateQuiz from './pages/CreateQuiz';
import Feedback from './pages/Feedback';
import ClassResults from './pages/ClassResults';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard layout */}
        <Route path="/dashboard" element={<ProtectedRoute roles={['admin', 'teacher', 'student']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="overview" element={<Overview />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="progress" element={<Progress />} />
          <Route path="classes" element={<Classes />} />
          <Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="teacher" element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="student" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
        </Route>
        <Route path="/quiz/:quizId" element={<QuizDetails />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/take-quiz/:quizId" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
        <Route path="class/:classId" element={<ClassDetails />} />
        <Route path="create-class" element={<CreateClass />} />
        <Route path="manage-class/:classId" element={<ManageClass />} />
        <Route path="/feedback/:resultId" element={<Feedback />} />
        <Route path="/class/:classId/results" element={<ClassResults />} />
      </Routes>
    </Router>
  );
};

export default App;







