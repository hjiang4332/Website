import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

//reducers
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers'

//load previous items from cache / save stuff into local storage
const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null,
	},
	cart: {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
	},
}

//reducers
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
)

export default store
