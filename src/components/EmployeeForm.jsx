import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CodeIcon from "@mui/icons-material/Code";
import { useDispatch } from "react-redux";
import { addEmployess, editEmployess } from "../store/action/authRegister";

const roles = [
  {
    value: "Full Stack",
    label: "Full Stack",
  },
  {
    value: "Front End",
    label: "Front End",
  },
  {
    value: "Back End",
    label: "Back End",
  },
];

const EmployeeForm = ({ loading ,userEditDetails, isEditEmployess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "Full Stack",
    dateOfJoining: "",
    status: "Active",
    image: null,
    imagePreview: null,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isEditEmployess) {
      const employeeToBeUpdate = {
        name: userEditDetails.name || "",
        email: userEditDetails.email || "",
        position:userEditDetails.position || "",
        department: userEditDetails.department || "Full Stack",
        dateOfJoining: userEditDetails.dateOfJoining || "",
        status: userEditDetails.status ? "Active" : "Inactive",
        image: userEditDetails.image || null,
        imagePreview: userEditDetails.image || null,
      }
      setFormData(employeeToBeUpdate)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // delete formData.imagePreview
    const formDatass = new FormData();
    const { name, email, position, department, dateOfJoining, status, image } = formData;
    const data = { name, email, position, department, dateOfJoining, status, image }
    Object.keys(data).map((key) => formDatass.append(key, formData[key]));

    if(isEditEmployess){
      dispatch(editEmployess(formDatass , userEditDetails._id))

    }else{
      dispatch(addEmployess(formDatass))

    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" mb={3}>
        Employee Form
      </Typography>

      {/* Name and Email in one line */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 2
        }}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ flex: 1 }}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Position and Role Selection */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 2
        }}
      >
        <TextField
          label="Position"
          name="position"
          fullWidth
          value={formData.position}
          onChange={handleChange}
          required
          sx={{ flex: 1 }}
        />

        <TextField
          fullWidth
          id="outlined-select-role"
          select
          label="Select Role"
          name="department"
          value={formData.department}
          helperText="Please select your role"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CodeIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Date of Joining and Status in one line */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Date of Joining"
          name="dateOfJoining"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfJoining}
          onChange={handleChange}
          required
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            name="status"
            value={formData.status}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Active" control={<Radio />} label="Active" />
            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Image Upload and Preview in one line */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Upload Image</FormLabel>
          <Button variant="outlined" component="label" sx={{ mt: 1 }}>
            Choose File
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </FormControl>

        {formData.imagePreview && (
          <Box
            sx={{
              flex: 1,
              maxWidth: "100%",
              maxHeight: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={formData.imagePreview}
              alt="Selected"
              sx={{
                maxWidth: "60%",
                maxHeight: "60%",
                objectFit: "contain", // Ensures the image maintains aspect ratio
                borderRadius: 2,
                boxShadow: 1,
              }}
              required
            />
          </Box>
        )}
      </Box>

      {/* <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        {isEditEmployess ? "Update" : "Submit"}
      </Button> */}
      <LoadingButton
        fullWidth
        type="submit"
        loading={loading}
        variant="contained"
        loadingIndicator="Processing..."
        size="large"
        sx={{
          textTransform: 'capitalize', mt: 2
        }}
      >
        {isEditEmployess ? "Update" : "Submit"}
      </LoadingButton>
    </Box>

  );
};

export default EmployeeForm;
