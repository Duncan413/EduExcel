import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material'; // Imported Grid from '@mui/material/Grid'

const Overview = () => {
  console.log('Overview component rendering');
  
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}> {/* Added item */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4">50</Typography> {/* Placeholder data */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}> {/* Added item */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Quizzes
              </Typography>
              <Typography variant="h4">15</Typography> {/* Placeholder data */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}> {/* Added item */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Classes
              </Typography>
              <Typography variant="h4">5</Typography> {/* Placeholder data */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;


