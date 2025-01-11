import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducer/authReducer';
import { calenderReducer } from './reducer/calender.reducer';

export default configureStore({
  reducer: {
    auth: authReducer, // You can name this key anything
    calender: calenderReducer
  },
});
