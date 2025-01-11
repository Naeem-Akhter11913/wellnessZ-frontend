import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CodeIcon from '@mui/icons-material/Code';
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from '@mui/material/InputAdornment';
import { editeUser } from '../../../store/action/authRegister';
import { RESET_AUTH_STATE } from '../../../store/type/type';
import { showAllertMessage } from '../../../utilities/toastifyAlert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const EditModal = ({ userEditDetails, handleClose, setUserEditDetails }) => {

  const { errorMessage, successMessage, loading } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: userEditDetails?.name || '',
    email: userEditDetails?.email || '',
    department: userEditDetails?.department || '',
    isActive: userEditDetails?.isActive || false,
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editeUser(userEditDetails._id, formData));

  };

  useEffect(() => {
    if (errorMessage) {
      dispatch({ type: RESET_AUTH_STATE });
    }
    if (successMessage) {
      dispatch({ type: RESET_AUTH_STATE });
      setUserEditDetails({});
      handleClose();
    }

  }, [errorMessage, successMessage]);

  return (
    <Box sx={style} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" component="h2" mb={2}>
        Edit User Details
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="Select role"
        defaultValue={formData.department}
        name='department'
        helperText="Please select your role"
        onChange={handleChange}
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

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Active Status</FormLabel>
        <RadioGroup
          row
          name="isActive"
          value={formData.isActive.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isActive: e.target.value === 'true',
            }))
          }
        >
          <FormControlLabel value="true" control={<Radio />} label="Active" />
          <FormControlLabel value="false" control={<Radio />} label="Inactive" />
        </RadioGroup>
      </FormControl>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={() => {
          handleClose()
          setUserEditDetails({});
        }}>
          Cancel
        </Button>
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
          Update
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default EditModal;
