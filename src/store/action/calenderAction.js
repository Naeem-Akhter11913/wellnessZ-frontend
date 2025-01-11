import authAPI from "../authApi/authAxios"
import { AUTH_CALENDER_ERROR, AUTH_CALENDER_SUCCESS, GET_ALL_CALENDER_META_DATA_ERROR, GET_ALL_CALENDER_META_DATA_SUCCESS, GET_CALENDER_CREDENTIAL_ERROR, GET_CALENDER_CREDENTIAL_SUCCESS, SET_CALENDER_EVENT_FAILED, SET_CALENDER_EVENT_SUCCESS } from "../type/calender.type"
import { LOADIN_STATE } from "../type/type";


export const authCalender = userId => {
    return dispatch => {
        try {
            window.location.href = `http://localhost:8080/api/1.0/calender/auth?userId=${userId}`;
        } catch (error) {
            dispatch({
                type: AUTH_CALENDER_ERROR,
                payload: {
                    errorMessage: error.message,
                },
            });
        }
    };
};

export const getCalenderCrendentials = userId => {
    return async dispatch => {
        try {
            const response = await authAPI.get(`calender/get-calender-credentials?userId=${userId}`)
            dispatch({
                type: GET_CALENDER_CREDENTIAL_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                    calenderCredentials: response.data.calenderData
                }
            })
        } catch (error) {
            dispatch({
                type: GET_CALENDER_CREDENTIAL_ERROR,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;  // Perform the redirect here
                return; 
            }
        }
    }
}
export const setEventOnClander = credentials => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE });
        try {
            const response = await authAPI.post(`calender/reminder-scheduler`, credentials)
            dispatch({
                type: SET_CALENDER_EVENT_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            dispatch({
                type: SET_CALENDER_EVENT_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.response?.data|| error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;  // Perform the redirect here
                return; 
            }
        }
    }
}
export const getAllMetaData = _ => {
    return async dispatch => {
        try {
            const response = await authAPI.get(`calender/get-all-calender-meta-data`)
            dispatch({
                type: GET_ALL_CALENDER_META_DATA_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                    reminderMetaData:response.data.reminderMetaData
                }
            })
        } catch (error) {
            dispatch({
                type: GET_ALL_CALENDER_META_DATA_ERROR,
                payload: {
                    errorMessage: error.response?.data?.message || error.response?.data|| error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;  // Perform the redirect here
                return; 
            }
        }
    }
}
