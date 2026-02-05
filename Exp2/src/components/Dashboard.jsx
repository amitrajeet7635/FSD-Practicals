import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Brightness4,
  Brightness7,
  ExitToApp,
  AccountCircle
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const StyledDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const StyledMainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  margin-top: 64px;
  transition: margin-left 0.3s;
`;

const Dashboard = ({ onThemeToggle, isDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const drawerWidth = 240;

  return (
    <StyledDashboardContainer>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1">
                {currentUser?.firstName} {currentUser?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={sidebarOpen}
        onClose={isMobile ? toggleSidebar : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Users', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <DashboardIcon />
                  ) : index === 1 ? (
                    <PeopleIcon />
                  ) : (
                    <SettingsIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <StyledMainContent
        style={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 0 : -drawerWidth,
          width: '100%'
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" color="text.secondary" fontWeight="bold">
              OVERVIEW
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, {currentUser?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your platform today.
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<SettingsIcon />} sx={{ borderRadius: 2 }}>
              Manage Widgets
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {[
            { title: 'Total Users', value: '1,245', color: 'primary', trend: '+12%'},
            { title: 'Revenue', value: '₹12,450', color: 'success', trend: '+5.2%' },
            { title: 'Active Sessions', value: '342', color: 'info', trend: '-2.4%' },
            { title: 'Pending Tasks', value: '28', color: 'warning', trend: '+8' }
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight="bold">
                        {metric.title.toUpperCase()}
                      </Typography>
                      <Typography variant="h4" component="div" color="text.primary" fontWeight="bold">
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: metric.trend.startsWith('+') ? 'success.main' : 'error.main', fontWeight: 'bold' }}>
                        {metric.trend} <Typography component="span" variant="caption" color="text.secondary">from last month</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ color: `${metric.color}.main` }}>
                      {metric.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Analytics & Performance
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mt: 0 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Metric {item}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {Math.floor(Math.random() * 1000)} Units
                  </Typography>
                  <Typography variant="body2">
                    Performance data for card {item}.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        
      </StyledMainContent>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
