import axios from '../api/axios';
import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    SAVE_NOTATION,
    SAVE_SHIPPING_INFO,
    UPDATE_ITEM_CART,
} from '../constants/cartConstants';

export const addItemToCart = (id, quantity, size, color) => async (dispatch, getState) => {
    const { data } = await axios.get(`product/${id}`);

    try {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
                size,
                color,
            },
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        alert(error);
    }
};
export const saveNotation = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SAVE_NOTATION,
            payload: data,
        });
        localStorage.setItem('notation', JSON.stringify(data));
    } catch (error) {
        alert(error);
    }
};
export const removeItemFromCart = (item) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_ITEM_CART,
            payload: item,
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        alert(error);
    }
};
export const updateItemCart = (item) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ITEM_CART,
            payload: item,
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        alert(error);
    }
};
export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });

        localStorage.setItem('shippingInfo', JSON.stringify(data));
    } catch (error) {
        alert(error);
    }
};
