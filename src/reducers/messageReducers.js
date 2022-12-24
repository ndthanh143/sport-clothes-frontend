import {
    ALL_MESSAGES_FAIL,
    ALL_MESSAGES_REQUEST,
    ALL_MESSAGES_SUCCESS,
    DELETE_MESSAGE_FAIL,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_RESET,
    DELETE_MESSAGE_SUCCESS,
    MESSAGE_DETAILS_REQUEST,
    MESSAGE_DETAILS_SUCCESS,
    NEW_MESSAGE_FAIL,
    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_FAIL,
    UPDATE_MESSAGE_REQUEST,
    UPDATE_MESSAGE_RESET,
    UPDATE_MESSAGE_SUCCESS,
    CLEAR_ERRORS,
    MESSAGE_DETAILS_FAIL,
} from '~/constants/messageConstants';

export const messagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case ALL_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload.messages,
            };

        case ALL_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newMessageReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case NEW_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_MESSAGE_SUCCESS:
            return {
                ...state,
                message: action.payload,
                success: action.payload.success,
                loading: false,
            };
        case NEW_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const messageDetailsReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case MESSAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MESSAGE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case MESSAGE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const updateMessageReducer = (state = { message: {} }, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message,
            };
        case UPDATE_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_MESSAGE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const deleteMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };

        case DELETE_MESSAGE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
