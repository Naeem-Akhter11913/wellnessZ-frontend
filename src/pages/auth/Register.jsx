import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Link } from 'react-router';
import CodeIcon from '@mui/icons-material/Code';
import { useDispatch, useSelector } from 'react-redux';
import { showAllertMessage } from '../../utilities/toastifyAlert';
import { validateEmail } from '../../utilities/emailValidate';
import { createUserRegister } from '../../store/action/authRegister';
import { RESET_AUTH_STATE } from '../../store/type/type';
import LoadingButton from "@mui/lab/LoadingButton";


const userType = [
    {
        value: 'regular',
        label: 'Regular',
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

const roles = [
    {
        value: 'Full Stack',
        label: 'Full Stack',
    },
    {
        value: 'Front End',
        label: 'Front End',
    },
    {
        value: 'Back End',
        label: 'Back End',
    }
];

const Register = () => {
    const dispatch = useDispatch();
    const { errorMessage, successMessage, loading } = useSelector(state => state.auth);

    const [registerCredentials, setregisterCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        department: 'Full Stack',
        typeOfUser: 'student',
        isActive: false
    });


    const collectData = e => {
        const { value, name } = e.target;
        setregisterCredentials({ ...registerCredentials, [name]: value })
    }

    const handleSignIn = e => {
        e.preventDefault();
        const { password, confirm_password, email, department, isActive, name, typeOfUser } = registerCredentials
        if (!password.match(confirm_password)) {
            return showAllertMessage('error', 'Miss matched the password');
        }
        if (!validateEmail(email)) {
            return showAllertMessage('error', 'Please enter a valid email');
        }

        const registrationCredentials = {
            password,
            email,
            department,
            isActive,
            name,
            typeOfUser
        }

        registrationCredentials.typeOfUser === 'admin' && delete registrationCredentials.department

        dispatch(createUserRegister(registrationCredentials));
    }

    useEffect(() => {
        if (errorMessage) {
            showAllertMessage('error', errorMessage);
        }
        if (successMessage) {
            showAllertMessage('success', successMessage);
        }
        dispatch({ type: RESET_AUTH_STATE })

    }, [errorMessage, successMessage]);


    return (
        <Box
            component={'form'}
            onSubmit={handleSignIn}
            sx={{
                mt: 5,
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
                    <Typography textAlign={'center'} component={'p'}>Register</Typography>
                    <Typography textAlign={'center'} component={'p'}>Already have account <Link
                        to="/login" variant="body2"
                        sx={{
                            cursor: "pointer",
                            textDecoration: 'none',
                        }} > Click here.</Link></Typography>
                </Box>
                <TextField
                    required
                    type="text"
                    id="outlined-required"
                    label="Enter full name"
                    name='name'
                    onChange={collectData}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    required
                    type="email"
                    id="outlined-required"
                    label="Email"
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
                    label="Password"
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
                <TextField
                    required
                    id="outlined-required"
                    label="Confirm password"
                    type='password'
                    name='confirm_password'
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
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select type"
                    defaultValue="regular"
                    name='typeOfUser'
                    helperText="Please select your role"
                    onChange={collectData}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SupervisorAccountIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                >
                    {userType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {registerCredentials.typeOfUser !== 'admin' &&
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select role"
                        defaultValue="Full Stack"
                        name='department'
                        helperText="Please select your role"
                        onChange={collectData}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CodeIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    >
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                }

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
                    Submit
                </LoadingButton>

            </Paper>
        </Box>
    )
}

export default Register