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
import { Link, useNavigate } from 'react-router';
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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const [registerCredentials, setregisterCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        department: 'Full Stack',
        typeOfUser: 'regular',
    });

    const collectData = e => {
        const { value, name } = e.target;
        setregisterCredentials({ ...registerCredentials, [name]: value });
        setErrors({ ...errors, [name]: "" });
    }


    const validate = () => {
        let validationErrors = {};
        if (!registerCredentials.name) {
            validationErrors.name = "Name is required.";
        }

        if (!registerCredentials.email) {
            validationErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(registerCredentials.email)) {
            validationErrors.email = "Enter a valid email.";
        }
        if (!registerCredentials.password) {
            validationErrors.password = "Password is required.";
        }
        if (!registerCredentials.confirm_password) {
            validationErrors.confirm_password = "Confirm password is required.";
        }
        if (registerCredentials.password !== '' &&
            registerCredentials.confirm_password !== '' &&
            registerCredentials.password !== registerCredentials.confirm_password
        ) {
            validationErrors.password = "Miss mached password.";
            validationErrors.confirm_password = "Miss mached password.";
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
            dispatch({ type: RESET_AUTH_STATE })
        }
        if (successMessage) {
            showAllertMessage('success', successMessage);
            setregisterCredentials({
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                department: 'Full Stack',
                typeOfUser: 'regular',
            });
            navigate('/login')
            dispatch({ type: RESET_AUTH_STATE })
        }
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
                    type="text"
                    id="outlined-required"
                    label="Enter full name"
                    name='name'
                    value={registerCredentials.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={collectData}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon style={{
                                        color: !!errors.name && '#d32f2f'
                                    }} />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField
                    type="email"
                    id="outlined-required"
                    label="Email"
                    name='email'
                    value={registerCredentials.email}
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
                    label="Password"
                    type='password'
                    name='password'
                    value={registerCredentials.password}
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
                <TextField
                    id="outlined-required"
                    label="Confirm password"
                    type='password'
                    name='confirm_password'
                    value={registerCredentials.confirm_password}
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password}
                    onChange={collectData}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon style={{
                                        color: !!errors.confirm_password && '#d32f2f'
                                    }} />
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
                    value={registerCredentials.typeOfUser}
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
                        value={registerCredentials.department}
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
