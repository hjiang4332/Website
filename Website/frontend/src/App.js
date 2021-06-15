import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'

function App() {
	//get card data from redux
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	//get user info from redux
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	const signoutHandler = () => {}
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
					<Route path='/cart/:id?' component={CartScreen}></Route>
					<Route
						path='/product/:id'
						component={ProductScreen}
					></Route>
					<Route path='/signin' component={SigninScreen}></Route>
					<Route path='/' component={HomeScreen} exact></Route>
				</main>

				<footer className='row center'>All right reserved</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
