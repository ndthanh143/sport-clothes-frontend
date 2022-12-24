import axios from '~/api/axios';
import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
} from '~/constants/categoryConstants';
import { CLEAR_ERRORS } from '~/constants/orderConstants';

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORIES_REQUEST });

        const { data } = await axios.get('/categories');

        dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_CATEGORIES_FAIL, payload: error.response.data.message });
    }
};
