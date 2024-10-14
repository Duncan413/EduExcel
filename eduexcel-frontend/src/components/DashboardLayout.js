import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px', // Adjust this margin to match the height of the AppBar (64px by default)
          },
        }}
      >
        <List>
          <ListItem button component={NavLink} to="/dashboard/overview">
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/quizzes">
            <ListItemText primary="Quizzes" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/progress">
            <ListItemText primary="Progress Tracking" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/classes">
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/dashboard/admin"
            sx={{ display: localStorage.getItem('role') === 'admin' ? 'block' : 'none' }}
          >
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;


