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
  const { errorMessage, successMessage, loading , isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });


  const collectData = e => {
    const { value, name } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value })
  }

  const handleSignIn = e => {
    e.preventDefault();
    const { email, password } = loginCredentials

    if (!password) {

      return showAllertMessage('error', 'Enter the password');
    }
    if (!email) {
      return showAllertMessage('error', 'Enter the email');
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

    // if(isAuthenticated){
    //   navigate('/');
    // }else{
    //   navigate('/login');
    // }

  }, [errorMessage, successMessage , isAuthenticated]);

  
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
          required
          type="email"
          id="outlined-required"
          label="Enter email"
          name='email'
          onChange={collectData}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Enter password"
          type='password'
          name='password'
          onChange={collectData}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
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