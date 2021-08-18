import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
	EMPTY_CART,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload
			const itemExists = state.cartItems.find(
				(x) =>
					x.product === item.product &&
					x.style === item.style &&
					x.size === item.size
			)

			if (itemExists) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === itemExists.product &&
						x.style === itemExists.style &&
						x.size === itemExists.size
							? item
							: x
					),
				}
			} else {
				return { ...state, cartItems: [...state.cartItems, item] }
			}
		case CART_REMOVE_ITEM:
			const item2 = action.payload
			const itemRemoved = state.cartItems.find(
				(x) => x.style === item2.style && x.size === item2.size
			)
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x !== itemRemoved),
			}
		// return {
		// 	...state,
		// 	cartItems: state.cartItems.filter(
		// 		(x) => x.product !== action.payload
		// 	),
		// }
		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload }
		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload }
		case EMPTY_CART:
			return { ...state, cartItems: [] }
		default:
			return state
	}
}
