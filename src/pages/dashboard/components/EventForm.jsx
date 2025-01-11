import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showAllertMessage } from "../../../utilities/toastifyAlert";
import { RESET_AUTH_STATE } from "../../../store/type/type";
import { getAllMetaData, setEventOnClander } from "../../../store/action/calenderAction";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

dayjs.extend(utc);
dayjs.extend(timezone);
const EventForm = ({ handleCloseEvent, eventData, setEventData, calenderCredentialsDetails }) => {

  const {
    reminderMetaData,
    calenderCredentials,
    calenderSuccessMessage,
    calenderErrorMessage,
    calenderLoading,
  } = useSelector((state) => state.calender);
  const {
    users,
    successMessage,
    errorMessage,
    userDetails,
    isAuthenticated,
    currentUser,
    loginSuccessMessage,
    loginErrorMessage
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    summary: "This is from web",
    description: "Hii, This is from web description",
    location: "virtual",
    startDateTime: null,
    endDateTime: null,
    timeZone: "America/Denver",
    attendees: eventData.email || "",
    userId: eventData._id,
    assigneeId: userDetails._id
  });
console.log(reminderMetaData)
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStartDateTime = dayjs(formData.startDateTime)
      .tz(formData.timeZone)
      .format('YYYY-MM-DDTHH:mm:ssZ');
    const formattedEndDateTime = dayjs(formData.endDateTime)
      .tz(formData.timeZone)
      .format('YYYY-MM-DDTHH:mm:ssZ');

    const eventCredentials = {
      ...formData,
      startDateTime: formattedStartDateTime,
      endDateTime: formattedEndDateTime,
      attendees: formData.attendees.split(",").map((email) => email.trim()),
    };
    dispatch(setEventOnClander(eventCredentials));
  };


  useEffect(() => {
    if (calenderErrorMessage) {
      showAllertMessage('error', calenderErrorMessage);
      dispatch({ type: RESET_AUTH_STATE });
    }
    if (calenderSuccessMessage) {
      showAllertMessage('success', calenderSuccessMessage);
      // setEventData({});
      dispatch(getAllMetaData())
      handleCloseEvent();
      dispatch({ type: RESET_AUTH_STATE });
    }
  }, [calenderSuccessMessage, calenderErrorMessage]);

  return (
    <Box
      sx={style}
    >
      <Typography variant="h5" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <Box component={'div'} sx={{ display: 'flex', gap: 2 }}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDateTime ? dayjs(formData.startDateTime) : null}
                onChange={(value) => handleDateChange("startDateTime", value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.endDateTime ? dayjs(formData.endDateTime) : null}
                onChange={(value) => handleDateChange("endDateTime", value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Box>
          <TextField
            fullWidth
            label="Time Zone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleInputChange}
            required
          />
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={() => {
              handleCloseEvent()
            }}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={calenderLoading}
              variant="contained"
              loadingIndicator="Processing..."
              size="large"
              sx={{
                textTransform: 'capitalize'
              }}
            >
              Create event
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EventForm;
