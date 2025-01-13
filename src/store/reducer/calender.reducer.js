import { GET_ALL_CALENDER_META_DATA_ERROR, GET_ALL_CALENDER_META_DATA_SUCCESS, GET_CALENDER_CREDENTIAL_ERROR, GET_CALENDER_CREDENTIAL_SUCCESS, SET_CALENDER_EVENT_FAILED, SET_CALENDER_EVENT_SUCCESS } from "../type/calender.type";
import {
    RESET_AUTH_STATE,
    LOADIN_STATE
} from "../type/type";


const initialStage = {
    reminderMetaData: [],
    calenderCredentials: {},
    calenderSuccessMessage: null,
    calenderErrorMessage: null,
    calenderLoading: false,
}

export const calenderReducer = (state = initialStage, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CALENDER_CREDENTIAL_SUCCESS:
            return {
                ...state,
                successMessage: payload.successMessage,
                calenderCredentials: payload.calenderCredentials,
                errorMessage: null
            }

        case GET_CALENDER_CREDENTIAL_ERROR:
            return {
                ...state,
                successMessage: null,
                errorMessage: payload.errorMessage
            }


        case SET_CALENDER_EVENT_SUCCESS:
            return {
                ...state,
                calenderSuccessMessage: payload.successMessage,
            }

        case SET_CALENDER_EVENT_FAILED:
            return {
                ...state,
                calenderErrorMessage: payload.errorMessage
            }

        case GET_ALL_CALENDER_META_DATA_SUCCESS:
            return {
                ...state,
                // calenderSuccessMessage: payload.successMessage,
                reminderMetaData: payload.reminderMetaData
            }

        case GET_ALL_CALENDER_META_DATA_ERROR:
            return {
                ...state,
                calenderErrorMessage: payload.errorMessage
            }


        case LOADIN_STATE:
            return {
                ...state,
                calenderLoading: true
            };

        case RESET_AUTH_STATE:
            return {
                ...initialStage,
                users: state.users,
                reminderMetaData: state.reminderMetaData,
            };
        default:
            return state;
    }
}

