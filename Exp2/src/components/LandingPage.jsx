import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Landing Page
          </Typography>
          <Button color="inherit" onClick={onGetStarted}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Welcome to Our Platform
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Experience a fully responsive interface designed with Material UI.
              Seamlessly adaptable to any device size.
            </Typography>
            <Button variant="contained" size="large" onClick={onGetStarted}>
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.light',
                color: 'primary.contrastText'
              }}
            >
              <Typography variant="h4">Responsive Visuals</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Feature {item}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body2">
                  Start using our amazing features today.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
