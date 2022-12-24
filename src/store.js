import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    productsReducer,
    productDetailsReducer,
    productSearchReducer,
    deleteProductReducer,
    newProductReducer,
    updateProductReducer,
    adminProductsReducer,
} from './reducers/productReducers';
import { authReducer, deleteUserReducer, updateUserReducer, userDetailReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    ordersReducer,
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    updateOrderReducer,
    deleteOrderReducer,
} from './reducers/ordersReducers';
import { categoryReducer } from './reducers/categoryReducers';
import {
    deleteMessageReducer,
    messageDetailsReducer,
    messagesReducer,
    newMessageReducer,
    updateMessageReducer,
} from './reducers/messageReducers';
import { provincesReducer } from './reducers/provinceReducers';

const reducers = combineReducers({
    // authentication
    auth: authReducer,
    // product
    products: productsReducer,
    productDetails: productDetailsReducer,
    productSearch: productSearchReducer,
    deleteProduct: deleteProductReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,
    adminProducts: adminProductsReducer,
    // user
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    userDetails: userDetailReducer,
    // cart
    cart: cartReducer,
    // order
    orders: ordersReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    updateOrder: updateOrderReducer,
    deleteOrder: deleteOrderReducer,
    // category
    category: categoryReducer,
    // message
    messages: messagesReducer,
    newMessage: newMessageReducer,
    messageDetails: messageDetailsReducer,
    updateMessage: updateMessageReducer,
    deleteMessage: deleteMessageReducer,
    // provinces
    provinces: provincesReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
        notation: localStorage.getItem('notation') ? JSON.parse(localStorage.getItem('notation')) : '',
    },
};

const middleware = [thunk];
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
