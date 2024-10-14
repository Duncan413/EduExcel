// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // For consistent styling
import theme from './theme/theme'; // Import the custom theme

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This applies a baseline for consistent styling */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
