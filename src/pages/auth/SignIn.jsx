import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from 'react-router';
import { showAllertMessage } from '../../utilities/toastifyAlert';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/action/authRegister';
import { RESET_AUTH_STATE } from '../../store/type/type';
import axios from 'axios';



const roles = [
  {
    value: 'employee',
    label: 'Employee',
  },
  {
    value: 'manager',
    label: 'Manager',
  },
  {
    value: 'admin',
    label: 'Admin',
  }
];

const SignIn = () => {
  const { errorMessage, successMessage, loading, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });


  const collectData = e => {
    const { value, name } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value })
    setErrors({ ...errors, [name]: "" });
  }

  const validate = () => {
    let validationErrors = {};
    if (!loginCredentials.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginCredentials.email)) {
      validationErrors.email = "Enter a valid email.";
    }
    if (!loginCredentials.password) {
      validationErrors.password = "Password is required.";
    }
    return validationErrors;
  };


  const handleSignIn = e => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginUser(loginCredentials))
  }

  useEffect(() => {
    if (errorMessage) {
      showAllertMessage('error', errorMessage);
      dispatch({ type: RESET_AUTH_STATE });
    }
    if (successMessage) {
      navigate('/')
      showAllertMessage('success', successMessage);
      dispatch({ type: RESET_AUTH_STATE });
    }
  }, [errorMessage, successMessage, isAuthenticated]);



  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const response = await axios.post('https://welness-z-server.vercel.app/api/1.0/user/verify-refresh-token', {}, { withCredentials: true });
        // const response = await axios.post('http://localhost:8080/api/1.0/user/verify-refresh-token', {}, { withCredentials: true });
        if (response.data.success) {
          navigate('/');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying refresh token:', error);
        navigate('/login');
      }
    };

    checkRefreshToken();
  }, []);

  return (
    <Box
      component={'form'}
      onSubmit={handleSignIn}
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: "center",
      }}
    >
      <Paper sx={{
        width: '500px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',

        gap: 2,
        p: 2
      }} elevation={2}>
        <Box component={'div'}>
          <Typography textAlign={'center'} component={'p'}>Sign In</Typography>
          <Typography textAlign={'center'} component={'p'}>Don't have account
            <Link
              to={'/register'}
              sx={{
                cursor: "pointer",
                textDecoration: 'none',
              }} > Click here.</Link></Typography>
        </Box>
        <TextField
          type="text"
          id="outlined-required"
          label="Enter email"
          name='email'
          error={!!errors.email}
          helperText={errors.email}
          onChange={collectData}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{
                    color: !!errors.email && '#d32f2f'
                  }} />
                </InputAdornment>
              )
            }
          }}
        />
        <TextField
          id="outlined-required"
          label="Enter password"
          type='password'
          name='password'
          error={!!errors.password}
          helperText={errors.password}
          onChange={collectData}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon style={{
                    color: !!errors.password && '#d32f2f'
                  }} />
                </InputAdornment>
              )
            }
          }}
        />

        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          loadingIndicator="Processing..."
          size="large"
          sx={{
            textTransform: 'capitalize'
          }}
        >
          Log in
        </LoadingButton>
      </Paper>
    </Box>
  )
}

export default SignIn