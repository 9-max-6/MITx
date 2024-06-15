import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Our Site</h1>
      <Link to="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
