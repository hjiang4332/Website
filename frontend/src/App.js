import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'
import { listProductCategories } from './actions/productActions'
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

function App() {
	//get card data from redux
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

	const productCategoryList = useSelector(
		(state) => state.productCategoryList
	)
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList

	//get Categories
	useEffect(() => {
		dispatch(listProductCategories())
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
					</ul>
				</aside>

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
						path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
						component={SearchScreen}
						exact
					></Route>

					<PrivateRoute
						path='/profile'
						component={ProfileScreen}
						exact
					/>
					<AdminRoute
						path='/productlist'
						component={ProductListScreen}
						exact
					/>

					<AdminRoute
						path='/productlist/pageNumber/:pageNumber'
						component={ProductListScreen}
						exact
					></AdminRoute>

					<AdminRoute path='/orderlist' component={OrderListScreen} />
					<AdminRoute path='/userlist' component={UserListScreen} />
					<AdminRoute
						path='/user/:id/edit'
						component={UserEditScreen}
					></AdminRoute>
					<Route path='/' component={HomeScreen} exact />

					<Route
						path='/pageNumber/:pageNumber'
						component={HomeScreen}
						exact
					></Route>
				</main>
				<footer className='row center'>All right reserved</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
