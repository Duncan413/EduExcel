import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}> {/* Ensure AppBar is above Drawer */}
        <Toolbar>
          {/* Ensuring the Link inherits the correct color and font */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}> {/* Explicit color set */}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              EduExcel
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8 }}> 
        <Box>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;


