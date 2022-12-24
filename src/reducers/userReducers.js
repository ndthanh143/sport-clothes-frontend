import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_FAIL,
} from '~/constants/userConstants';

export const authReducer = (state = { user: {}, users: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            };
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                users: action.payload,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                users: null,
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

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };

        // case DELETE_USER_RESET:
        //     return {
        //         ...state,
        //         isDeleted: false,
        //     };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const updateUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                user: action.payload.user,
            };
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
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

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADMIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case ADMIN_USER_FAIL:
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
