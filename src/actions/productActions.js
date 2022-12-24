import axios from '../api/axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
} from '../constants/productConstants';

export const getAllProducts =
    (currentPage = 1, category, price) =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCTS_REQUEST,
            });

            let link = `products?page=${currentPage}`;
            if (price) {
                if (category) {
                    link = `products?page=${currentPage}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
                } else {
                    link = `products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
                }
            } else if (category) {
                link = `products?page=${currentPage}&category=${category}`;
            }

            if (currentPage == 0) {
                link = 'products';
            }

            const { data } = await axios.get(link);
            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const getProductSearch =
    (keyword = '') =>
    async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_SEARCH_REQUEST,
            });

            const { data } = await axios.get(`productSearch?keyword=${keyword}`);
            dispatch({
                type: PRODUCT_SEARCH_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_SEARCH_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            // payload: error.response.data.message,
            payload: error.message,
        });
    }
};

////// Admin
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCTS_REQUEST,
        });

        const { data } = await axios.get(`admin/products`);
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            // payload: error.response.data.message,
            payload: error.message,
        });
    }
};

export const newProduct = (name, price, category, stock, images, colorList, sizes, description) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const productData = {
            name,
            price,
            category,
            stock,
            images,
            colors: colorList,
            sizes,
            description,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('admin/product/new', JSON.stringify(productData), config);
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_PRODUCT_FAIL, payload: error.message });
    }
};

export const updateProduct =
    (id, name, price, category, stock, images, colorList, sizes, description) => async (dispatch) => {
        try {
            dispatch({ type: UPDATE_PRODUCT_REQUEST });

            const productData = {
                name,
                price,
                category,
                stock,
                images,
                colors: colorList,
                sizes,
                stock,
                description,
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.put(`admin/product/${id}`, JSON.stringify(productData), config);

            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message });
        }
    };

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        await axios.delete(`admin/product/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
