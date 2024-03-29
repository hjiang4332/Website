import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import { signout } from './actions/userActions'
import { listProductCategories } from './actions/productActions'
import { listProductQualities } from './actions/productActions'

//components
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import SearchBox from './components/SearchBox'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'
import ChatBox from './components/ChatBox'

//screens
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
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
import FaqScreen from './screens/FaqScreen'
import TermsScreen from './screens/policyScreens/TermsScreen'
import RefundPolicyScreen from './screens/policyScreens/RefundPolicyScreen'
import ShippingPolicyScreen from './screens/policyScreens/ShippingPolicyScreen'

import { Trans, useTranslation } from 'react-i18next'

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

	//Different languages - i18next
	const { i18n } = useTranslation()
	const changeLanguage = (language) => {
		i18n.changeLanguage(language)
	}

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
								<SearchBox history={history} />
							)}
						></Route>
					</div>

					<div>
						<div className='dropdown'>
							<Link to='#admin'>
								<i className='fa fa-globe'></i>{' '}
								<Trans i18nKey='language' />
								<i className='fa fa-caret-down'></i>
							</Link>

							<ul className='dropdown-content'>
								<li>
									<div onClick={() => changeLanguage('en')}>
										English - English
									</div>
								</li>
								<li>
									<div onClick={() => changeLanguage('es')}>
										Spanish-español
									</div>
								</li>
								<li>
									<div onClick={() => changeLanguage('zh')}>
										Chinese - 中文
									</div>
								</li>
								<li>
									<div onClick={() => changeLanguage('ko')}>
										Korean - 한국어
									</div>
								</li>
							</ul>
						</div>

						<Link to='/faq'>
							<Trans i18nKey='faq' />
						</Link>

						<Link
							to={{
								pathname: '/cart',
								state: {
									cartButtonClicked: 'true',
								},
							}}
						>
							<Trans i18nKey='cart' />
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
										<Link to='/profile'>
											<Trans i18nKey='profile' />
										</Link>
									</li>

									<li>
										<Link to='/orderhistory'>
											<Trans i18nKey='orderHistory' />
										</Link>
									</li>

									<li>
										<Link
											to='#signout'
											onClick={signoutHandler}
										>
											<Trans i18nKey='signOut' />
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to='/signin'>
								<Trans i18nKey='signIn' />
							</Link>
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
							<strong>
								<Trans i18nKey='categories' />
							</strong>
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
							<strong>
								<Trans i18nKey='quality' />
							</strong>
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
					<Route path='/search' component={SearchScreen} exact />
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

					{/* Policy Screens */}
					<Route path='/terms' component={TermsScreen} exact />
					<Route
						path='/refund-policy'
						component={RefundPolicyScreen}
						exact
					/>
					<Route
						path='/shipping-policy'
						component={ShippingPolicyScreen}
						exact
					/>
				</main>

				<footer className='footer-row'>
					<div className='column'>
						<div>
							<h2 className='widget-title'>
								<Trans i18nKey='about' />
							</h2>
							<div className='copyright'>
								© <Trans i18nKey='allRightsReserved' />
							</div>

							<div className='cards'>
								<i
									className='fa fa-cc-paypal'
									aria-hidden='true'
								></i>
								<i
									className='fa fa-credit-card-alt'
									aria-hidden='true'
								></i>

								<i
									className='fa fa-cc-discover'
									aria-hidden='true'
								></i>
							</div>

							<p>
								<i className='fa fa-lock' aria-hidden='true' />
								<Trans i18nKey='secureOnlinePayments' />
							</p>

							<div className='social-widget'>
								<a href='https://www.instagram.com/classyjewelryws/'>
									<i
										className='fa fa-instagram'
										aria-hidden='true'
									/>
								</a>
							</div>
						</div>
					</div>

					<div className='column'>
						<div className='footer-widget'>
							<h2 className='widget-title'>
								<Trans i18nKey='information' />
							</h2>
							<ul>
								<li>
									<Link to='/terms'>
										<Trans i18nKey='termsAndConditions' />
									</Link>
								</li>
								<li>
									<Link to='/refund-policy'>
										<Trans i18nKey='refundPolicy' />
									</Link>
								</li>
								<li>
									<Link to='/shipping-policy'>
										<Trans i18nKey='shippingAndDelivery' />
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className='column'>
						<div>
							<h2 className='widget-title'>
								<Trans i18nKey='contact' />
							</h2>
							<div className='contact-address'>
								<i
									className='fa fa-map-marker'
									aria-hidden='true'
								></i>
								<Trans i18nKey='address' /> : 48W 28th street
								Manhattan
							</div>

							<div className='contact-number'>
								<i
									className='fa fa-mobile'
									aria-hidden='true'
								></i>
								<Trans i18nKey='phoneNumber' />
								<br />
								(347)-773-6389
							</div>

							<div className='contact-email'>
								<i
									className='fa fa-envelope'
									aria-hidden='true'
								/>
								<Trans i18nKey='email' />:
								classyjewelryws@gmail.com
							</div>
						</div>
					</div>
				</footer>

				{userInfo && !userInfo.isAdmin && (
					<ChatBox userInfo={userInfo} />
				)}
			</div>
		</BrowserRouter>
	)
}

export default App
