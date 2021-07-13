import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import { signout } from './actions/userActions'
import { listProductCategories } from './actions/productActions'
import { listProductQualities } from './actions/productActions'

import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SearchBox from './components/SearchBox'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'

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
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import SearchScreen from './screens/SearchScreen'
import DashboardScreen from './screens/DashboardScreen'
import SupportScreen from './screens/SupportScreen'
import ChatBox from './components/ChatBox'
import FaqScreen from './screens/FaqScreen'

function App() {
	//get cart data from redux
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	//get user info from redux
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	//Side bar
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

	const dispatch = useDispatch()
	const signoutHandler = () => {
		dispatch(signout())
	}

	//list of categories
	const productCategoryList = useSelector(
		(state) => state.productCategoryList
	)
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList

	//list of product quality
	const productQualityList = useSelector((state) => state.productQualityList)
	const {
		loading: loadingQualities,
		error: errorQualities,
		qualities,
	} = productQualityList

	//get Categories
	useEffect(() => {
		dispatch(listProductCategories())
		dispatch(listProductQualities())
	}, [dispatch])

	return (
		<BrowserRouter>
			<div className='grid-container'>
				<header className='row'>
					<div>
						<button
							type='button'
							className='open-sidebar'
							onClick={() => setSidebarIsOpen(true)}
						>
							<i className='fa fa-bars'></i>
						</button>

						<Link className='brand' to='/'>
							Classy Jewelry
						</Link>
					</div>

					<div>
						<Route
							render={({ history }) => (
								<SearchBox history={history}></SearchBox>
							)}
						></Route>
					</div>

					<div>
						<Link to='/faq'>FAQ</Link>
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

									<li>
										<Link to='/support'>Support</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>

				<aside className={sidebarIsOpen ? 'open' : ''}>
					<ul className='categories'>
						<li>
							<strong>Categories</strong>
							<button
								onClick={() => setSidebarIsOpen(false)}
								className='close-sidebar'
								type='button'
							>
								<i className='fa fa-close'></i>
							</button>
						</li>

						{loadingCategories ? (
							<LoadingBox></LoadingBox>
						) : errorCategories ? (
							<MessageBox variant='danger'>
								{errorCategories}
							</MessageBox>
						) : (
							categories.map((c) => (
								<li key={c}>
									<Link
										to={`/search/category/${c}`}
										onClick={() => setSidebarIsOpen(false)}
									>
										{c}
									</Link>
								</li>
							))
						)}
						<li>
							<strong>Quality</strong>
							<button
								onClick={() => setSidebarIsOpen(false)}
								className='close-sidebar'
								type='button'
							>
								<i className='fa fa-close'></i>
							</button>
						</li>

						{loadingQualities ? (
							<LoadingBox></LoadingBox>
						) : errorQualities ? (
							<MessageBox variant='danger'>
								{errorQualities}
							</MessageBox>
						) : (
							qualities.map((q) => (
								<li key={q}>
									<Link
										to={`/search/quality/${q}`}
										onClick={() => setSidebarIsOpen(false)}
									>
										{q}
									</Link>
								</li>
							))
						)}
					</ul>
				</aside>

				<main>
					{/* Customer */}
					<PrivateRoute
						path='/placeorder'
						component={PlaceOrderScreen}
					/>
					<PrivateRoute
						path='/payment'
						component={PaymentMethodScreen}
					/>
					<PrivateRoute
						path='/shipping'
						component={ShippingAddressScreen}
					/>
					<PrivateRoute path='/profile' component={ProfileScreen} />
					<PrivateRoute
						path='/orderhistory'
						component={OrderHistoryScreen}
					/>
					<PrivateRoute path='/order/:id' component={OrderScreen} />

					{/* Admin */}
					<AdminRoute path='/dashboard' component={DashboardScreen} />
					<AdminRoute
						path='/productlist'
						component={ProductListScreen}
						exact
					/>
					<AdminRoute
						path='/productlist/pageNumber/:pageNumber'
						component={ProductListScreen}
						exact
					/>
					<AdminRoute
						path='/product/:id/edit'
						component={ProductEditScreen}
						exact
					/>
					<AdminRoute path='/orderlist' component={OrderListScreen} />
					<AdminRoute path='/userlist' component={UserListScreen} />
					<AdminRoute
						path='/user/:id/edit'
						component={UserEditScreen}
					/>
					<AdminRoute path='/support' component={SupportScreen} />

					{/* Public */}
					<Route path='/signin' component={SigninScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route
						path='/product/:id'
						component={ProductScreen}
						exact
					/>
					<Route
						path='/search/name/:name?'
						component={SearchScreen}
						exact
					/>
					<Route
						path='/search/category/:category'
						component={SearchScreen}
						exact
					/>
					<Route
						path='/search/category/:category/name/:name'
						component={SearchScreen}
						exact
					/>
					<Route
						path='/search/quality/:quality'
						component={SearchScreen}
						exact
					/>
					<Route
						path='/search/quality/:quality/name/:name'
						component={SearchScreen}
						exact
					/>
					<Route
						path='/search/category/:category/quality/:quality/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber'
						component={SearchScreen}
						exact
					/>

					<Route path='/faq' component={FaqScreen} exact />
					<Route path='/' component={HomeScreen} exact />
					<Route
						path='/pageNumber/:pageNumber'
						component={HomeScreen}
						exact
					/>
				</main>

				<footer className='row center'>
					{userInfo && !userInfo.isAdmin && (
						<ChatBox userInfo={userInfo} />
					)}
					<div>All rights reserved</div>{' '}
				</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
