import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PersonList from './PersonList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CodeIcon from '@mui/icons-material/Code';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.github.com/alineagq">
        Aline Queiroz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Flask React APP
          </Typography>
        </Toolbar>
      </AppBar>
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm" 
        style={{ backgroundColor: '#FFF' }}
        >
          <PersonList />
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              Follow me on any social media!
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
