
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import { Box, Typography } from '@mui/material';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/auth/Register';

const App = () => {
  
  return (
    <Box component={'div'}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <Box>
                <Typography component={'p'}>Oops, wrong URL</Typography>
              </Box>
            }
          />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
