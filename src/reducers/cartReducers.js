import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, UPDATE_ITEM_CART } from '~/constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product && i.size === item.size && i.color === item.color,
            );
            if (isItemExist) {
                state.cartItems.map((i) =>
                    i.product === item.product && i.size === item.size && i.color === item.color
                        ? (i.quantity += item.quantity)
                        : null,
                );
                return {
                    ...state,
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        }
        case REMOVE_ITEM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (i) =>
                        i.product !== action.payload.product ||
                        i.size !== action.payload.size ||
                        i.color !== action.payload.color,
                ),
            };
        }
        case UPDATE_ITEM_CART: {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product && i.size === item.size && i.color === item.color,
            );
            if (isItemExist) {
                state.cartItems.map((i) =>
                    i.product === item.product && i.size === item.size && i.color === item.color ? (i = item) : null,
                );
            }
            return { ...state };
        }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};
