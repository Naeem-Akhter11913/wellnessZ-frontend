import {
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    RESET_AUTH_STATE,
    LOADIN_STATE,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGIN_AUTH_FAILED,
    USER_LOGIN_AUTH_SUCCESS,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILED,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    LOG_USER_FAILED,
    LOG_USER_SUCCESS,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_ERROR
} from "../type/type";


const initialStage = {
    isSetup: true,
    users: [],
    userDetails: {},
    currentUser: {},
    successMessage: null,
    errorMessage: null,
    loginSuccessMessage: null,
    loginErrorMessage: null,
    loading: false,
    isAuthenticated: false,
}

export const authReducer = (state = initialStage, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage,
                errorMessage: null
            }

        case USER_REGISTER_FAILED:
            return {
                ...state,
                successMessage: null,
                errorMessage: payload.errorMessage
            }


        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage,
                currentUser: payload.currentUser,
                errorMessage: null
            }

        case USER_LOGIN_FAILED:
            return {
                ...state,
                successMessage: null,
                errorMessage: payload.errorMessage
            }


        case USER_LOGIN_AUTH_SUCCESS:
            return {
                ...state,
                userDetails: payload.userDetails,
                isAuthenticated: true
            }

        case USER_LOGIN_AUTH_FAILED:
            return {
                ...state,
                isAuthenticated: false
            }

        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: payload.allUser,
                // successMessage: payload.successMessage
            }
        // case GET_ALL_USER_FAILED:
        //     return {
        //         ...state,
        //         successMessage: payload.errorMessage
        //     }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage
            }
        case EDIT_USER_FAILED:
            return {
                ...state,
                errorMessage: payload.errorMessage
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage
            }
        case DELETE_USER_FAILED:
            return {
                ...state,
                errorMessage: payload.errorMessage
            }


        case LOG_USER_SUCCESS:
            return {
                ...state,
                loginSuccessMessage: payload.successMessage
            }
        case LOG_USER_FAILED:
            return {
                ...state,
                loginErrorMessage: payload.errorMessage
            }


        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage
            }
        case ADD_EMPLOYEE_ERROR:
            return {
                ...state,
                errorMessage: payload.errorMessage
            }






        case LOADIN_STATE:
            return {
                ...state,
                loading: true
            };

        case RESET_AUTH_STATE:
            return {
                ...initialStage,
                users: state.users,
                userDetails: state.userDetails
            };
        default:
            return state;
    }
}

