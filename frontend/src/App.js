import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

//screens
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SigninScreen from './screens/SigninScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

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
						<Link to='/cart'>
							Cart
							{cartItems.length > 0 && (
								<span className='badge'>
									{cartItems.length}
								</span>
							)}
						</Link>
						{userInfo ? (
							<div className='dropdown'>
								<Link to='#'>
									{userInfo.name}{' '}
									<i className='fa fa-caret-down'></i>{' '}
								</Link>
								<ul className='dropdown-content'>
									<li>
										<Link to='/profile'>Profile</Link>
									</li>

									<li>
										<Link to='/orderhistory'>
											Order History
										</Link>
									</li>

									<li>
										<Link
											to='#signout'
											onClick={signoutHandler}
										>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to='/signin'>Sign In</Link>
						)}

						{userInfo && userInfo.isAdmin && (
							<div className='dropdown'>
								<Link to='#admin'>
									Admin <i className='fa fa-caret-down'></i>
								</Link>

								<ul className='dropdown-content'>
									<li>
										<Link to='/dashboard'>Dashboard</Link>
									</li>
									<li>
										<Link to='/productlist'>Products</Link>
									</li>
									<li>
										<Link to='/orderlist'>Orders</Link>
									</li>
									<li>
										<Link to='/userlist'>Users</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>
				<main>
					<Route path='/cart/:id?' component={CartScreen} />
					<Route
						path='/product/:id'
						component={ProductScreen}
						exact
					/>
					<Route
						path='/product/:id/edit'
						component={ProductEditScreen}
						exact
					/>
					<Route path='/signin' component={SigninScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/shipping' component={ShippingAddressScreen} />
					<Route path='/payment' component={PaymentMethodScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route
						path='/orderhistory'
						component={OrderHistoryScreen}
					/>
					<PrivateRoute
						path='/profile'
						component={ProfileScreen}
						exact
					/>
					<AdminRoute
						path='/productlist'
						component={ProductListScreen}
					/>
					<AdminRoute path='/orderlist' component={OrderListScreen} />
					<Route path='/' component={HomeScreen} exact />
				</main>
				<footer className='row center'>All right reserved</footer>
			</div>
		</BrowserRouter>
	)
}

export default App