import axios from 'axios';
import { ALL_PROVINCES_FAIL, ALL_PROVINCES_REQUEST, ALL_PROVINCES_SUCCESS } from '~/constants/provinceConstants';

export const getAllProvinces = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROVINCES_REQUEST });

        const { data } = await axios.get('https://provinces.open-api.vn/api/');

        dispatch({ type: ALL_PROVINCES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_PROVINCES_FAIL, payload: error.response.data.message });
    }
};
