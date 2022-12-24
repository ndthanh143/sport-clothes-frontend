import axios from '../api/axios';
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
    MESSAGE_DETAILS_FAIL,
    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_FAIL,
    UPDATE_MESSAGE_FAIL,
    UPDATE_MESSAGE_REQUEST,
    UPDATE_MESSAGE_RESET,
    UPDATE_MESSAGE_SUCCESS,
    CLEAR_ERRORS,
} from '~/constants/messageConstants';

export const getAllMessages = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_MESSAGES_REQUEST });

        const { data } = await axios.get('messages');

        dispatch({ type: ALL_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_MESSAGES_FAIL, payload: error.response.data.message });
    }
};

export const newMessage = (senderInfo, title, content) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MESSAGE_REQUEST });
        const dataMessage = {
            senderInfo,
            title,
            content,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('message/new', JSON.stringify(dataMessage), config);
        dispatch({ type: NEW_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_MESSAGE_FAIL, payload: error.response.data.message });
    }
};

export const getMessageDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MESSAGE_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`message/${id}`);
        dispatch({
            type: MESSAGE_DETAILS_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: MESSAGE_DETAILS_FAIL,
            payload: error.message,
        });
    }
};

export const updateMessage = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MESSAGE_REQUEST });

        const messageData = {
            status,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(`message/${id}`, JSON.stringify(messageData), config);

        dispatch({ type: UPDATE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_MESSAGE_FAIL, payload: error.message });
    }
};

export const deleteMessage = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MESSAGE_REQUEST });

        await axios.delete(`message/${id}`);
        dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_MESSAGE_FAIL, payload: error.message });
    }
};
