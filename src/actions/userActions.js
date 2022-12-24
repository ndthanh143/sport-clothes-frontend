import axios from '../api/axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_FAIL,
} from '../constants/userConstants';

// Get all users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get('admin/users');
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAdminUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USER_REQUEST });
        const { data } = await axios.get(`admin/user/${id}`);
        dispatch({ type: ADMIN_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: ADMIN_USER_FAIL, payload: error });
    }
};
export const updateUser = (id, name, role) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const userData = {
            name,
            role,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(`admin/user/${id}`, JSON.stringify(userData), config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.message });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`admin/user/${id}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error });
    }
};

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            'login',

            { email, password },

            config,
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('register', userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        });

        const { data } = await axios.get('me');
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    const config = {
        withCredentials: true,
    };
    try {
        await axios.get('logout', config);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
