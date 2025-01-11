import axios from "axios"
import authAPI from "../authApi/authAxios"
import {
    ADD_EMPLOYEE_ERROR,
    ADD_EMPLOYEE_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_SUCCESS,
    EDIT_USER_FAILED,
    EDIT_USER_SUCCESS,
    GET_ALL_USER_FAILED,
    GET_ALL_USER_SUCCESS,
    LOADIN_STATE,
    LOG_USER_FAILED,
    LOG_USER_SUCCESS,
    USER_LOGIN_AUTH_FAILED,
    USER_LOGIN_AUTH_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS
} from "../type/type"



export const createUserRegister = (credentials) => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE }) // to make the loading state
        try {
            const response = await authAPI.post('user/registration', credentials)

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.messsage
                }
            });
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            });
        }
    }
}

export const loginUser = credentials => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE })
        try {
            const response = await authAPI.post('user/user-login', credentials)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                    currentUser: response.data.user
                }
            });
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            })
        }
    }
}

export const checkAuth = _ => {
    return async dispatch => {
        try {
            const response = await authAPI.post('user/verify-token');
            dispatch({
                type: USER_LOGIN_AUTH_SUCCESS,
                payload: {
                    userDetails: response.data.user,
                    successMessage: response.data.message
                }
            });
        } catch (error) {
            dispatch({
                type: USER_LOGIN_AUTH_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;
                return;
            }
        }
    }
}

export const getAllUser = ({ page, limit }) => {
    return async dispatch => {
        try {
            let response = await authAPI.get(`user/get-users?page=${page}&limit=${limit}`);

            dispatch({
                type: GET_ALL_USER_SUCCESS,
                payload: {
                    allUser: response.data,
                    successMessage: response.data.message
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_ALL_USER_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;
                return;
            }
        }
    }
}

export const editeUser = (userid, userCredentials) => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE })
        try {
            const response = await authAPI.put(`user/edit-users?itemID=${userid}`, { ...userCredentials });

            dispatch({
                type: EDIT_USER_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            dispatch({
                type: EDIT_USER_FAILED,
                payload: {
                    errorMessage: error.response?.data?.message || error.message
                }
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;
                return;
            }
        }
    }
}

export const deleteUser = userid => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE });
        try {
            const response = await authAPI.delete(`user/delete-users?itemID=${userid}`);
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: {
                    successMessage: response.data.message
                }
            })
        } catch (error) {
            dispatch({
                type: DELETE_USER_FAILED,
                errorMessage: error.response?.data?.message || error.message
            });
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;
                return;
            }
        }
    }
}


export const addEmployess = credentials => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE })
        try {
            const response = await authAPI.post(`user/add-employeee`, credentials, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content-type to multipart/form-data for file uploads
                },
            });

            dispatch({
                type: ADD_EMPLOYEE_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            dispatch({
                type: ADD_EMPLOYEE_ERROR,
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
export const editEmployess = (credentials,id) => {
    return async dispatch => {
        dispatch({ type: LOADIN_STATE })
        try {
            const response = await authAPI.put(`user/edit-employee?id=${id}`, credentials, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content-type to multipart/form-data for file uploads
                },
            });

            dispatch({
                type: ADD_EMPLOYEE_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        } catch (error) {
            dispatch({
                type: ADD_EMPLOYEE_ERROR,
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

export const logoutUser = _ => {
    return async dispatch => {
        try {
            const response = await authAPI.post(`user/log-out-users`);
            window.location.href = 'http://localhost:5173/login'
            dispatch({
                type: LOG_USER_SUCCESS,
                payload: {
                    successMessage: response.data.message
                }
            })
            //log-out-users
        } catch (error) {
            dispatch({
                type: LOG_USER_FAILED,
                errorMessage: error.response?.data?.message || error.message
            })
            if (error.response?.data.redirect) {
                window.location.href = error.response?.data.redirect;  // Perform the redirect here
                return; 
            }
        }
    }
}