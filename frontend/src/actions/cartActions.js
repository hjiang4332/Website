import Axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart =
	(productId, qty, style, size) => async (dispatch, getState) => {
		const { data } = await Axios.get(`/api/products/${productId}`)
		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				name: data.name,
				image: data.image,
				price: data.price,
				wsPrice: data.wsPrice,
				costPrice: data.costPrice,
				onSale: data.onSale,
				countInStock: data.countInStock,
				product: data._id,
				customizations: data.customizations,
				qty,
				style,
				size,
			},
		})
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	}

export const removeFromCart =
	(productId, style, size) => (dispatch, getState) => {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: { productId, style, size },
		})
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	}

//ShippingAddressScreen - save address info
export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
	localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//PaymentMethodScreen - save payment method
export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}
