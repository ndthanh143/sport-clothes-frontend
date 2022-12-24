import { CLEAR_ERRORS } from '~/constants/productConstants';
import { ALL_PROVINCES_FAIL, ALL_PROVINCES_REQUEST, ALL_PROVINCES_SUCCESS } from '~/constants/provinceConstants';

export const provincesReducer = (state = { provinces: [] }, action) => {
    switch (action.type) {
        case ALL_PROVINCES_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_PROVINCES_SUCCESS:
            return {
                ...state,
                loading: false,
                provinces: action.payload,
            };

        case ALL_PROVINCES_FAIL:
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
