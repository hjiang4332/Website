import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'

//screens
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SigninScreen from './screens/SigninScreen'

function App() {
	//get card data from redux
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	//get user info from redux
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	const dispatch = useDispatch()
	const signoutHandler = () => {
		dispatch(signout())
	}

	return (
		<BrowserRouter>
			<div className='grid-container'>
				<header className='row'>
					<div>
						<Link className='brand' to='/'>
							Classy Jewelry
						</Link>
					</div>

					<div>
						<Link to='/cart'>Cart</Link>
						{cartItems.length > 0 && (
							<span className='badge'>{cartItems.length}</span>
						)}

						{userInfo ? (
							<div className='dropdown'>
								<Link to='#'>
									{userInfo.name}{' '}
									<i className='fa fa-caret-down'></i>
								</Link>
								<ul className='dropdown-content'>
									<Link
										to='#signout'
										onClick={signoutHandler}
									>
										Sign Out
									</Link>
								</ul>
							</div>
						) : (
							<Link to='/signin'>Sign in</Link>
						)}
					</div>
				</header>

				<main>
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/signin' component={SigninScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/shipping' component={ShippingAddressScreen} />
					<Route path='/payment' component={PaymentMethodScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/' component={HomeScreen} exact />
				</main>

				<footer className='row center'>All right reserved</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
