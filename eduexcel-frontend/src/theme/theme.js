// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

// Custom theme for EduExcel
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f57c00', // Orange
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      color: '#333', // Main text color
    },
  },
});

export default theme;
