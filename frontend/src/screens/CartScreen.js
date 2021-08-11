import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'
import { useLocation } from 'react-router-dom'

import { Trans } from 'react-i18next'

export default function CartScreen(props) {
	const productId = props.match.params.id
	// const qty = props.location.search
	// 	? Number(props.location.search.split('=')[1])
	// 	: 1
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	let params = new URLSearchParams(document.location.search.substring(1))
	let qty = params.get('qty') ? Number(params.get('qty')) : 1
	let color = params.get('color') ? params.get('color') : '0'
	let size = params.get('size') ? Number(params.get('size')) : 0

	const dispatch = useDispatch()
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty, color, size))
		}
	}, [dispatch, productId, qty, color, size])

	function timeout(delay: number) {
		return new Promise((res) => setTimeout(res, delay))
	}

	//redirect users back to home after adding to cart
	/*const location = useLocation()
	const cartButtonClicked = location.state || 'false'
	
    if (
		cartButtonClicked === 'false' ||
		typeof cartButtonClicked === 'undefined'
	) {
		await timeout(1000) //for 1 sec delay
		props.history.push('/')
	}*/

	const removeFromCartHandler = (id, color, size) => {
		dispatch(removeFromCart(id, color, size))
	}

	const checkoutHandler = () => {
		props.history.push('/signin?redirect=shipping')
	}
	return (
		<div className='row top'>
			<div className='col-2'>
				<h1>
					<Trans i18nKey='shoppingCart' />
				</h1>
				{cartItems.length === 0 ? (
					<MessageBox>
						<Trans i18nKey='yourCartIsEmpty' />.
						<Link to='/'>
							<Trans i18nKey='goShopping' />
						</Link>
					</MessageBox>
				) : (
					<ul>
						{cartItems.map((item) => (
							<li key={item.product + item.color + item.size}>
								<div className='row'>
									<div>
										<img
											src={item.image}
											alt={item.name}
											className='small'
										/>
									</div>
									<div className='min-30'>
										<Link
											to={{
												pathname: `/product/${item.product}`,
												state: {
													customizations:
														item.customizations,
												},
											}}
										>
											<h2>{item.name}</h2>
										</Link>
									</div>

									{item.color === '0' ||
										(item.color !== '' && (
											<span>
												{'Color: ' + item.color}
											</span>
										))}

									{item.size !== 0 && (
										<span>{'Size : ' + item.size}</span>
									)}

									<div>
										<select
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value),
														item.color,
														item.size
													)
												)
											}
										>
											{[
												...Array(
													item.countInStock
												).keys(),
											].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											))}
										</select>
									</div>

									<div>
										<span className='pad-right'>
											{!item.onSale ? (
												<span>${item.wsPrice} ea.</span>
											) : (
												<span>
													<Trans i18nKey='onSale' />:
													${item.wsPrice} ea.
												</span>
											)}
										</span>
										<span>
											<Trans i18nKey='total' />: $
											{item.wsPrice * item.qty}
										</span>
									</div>

									{/* Remove Item */}
									<div>
										<button
											type='button'
											onClick={() =>
												removeFromCartHandler(
													item.product,
													item.color,
													item.size
												)
											}
										>
											<Trans i18nKey='removeItem' />
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className='col-1'>
				<div className='card card-body'>
					<ul>
						<li>
							<h2>
								<Trans i18nKey='subtotal' /> (
								{cartItems.reduce(
									(a, c) => a + Number(c.qty),
									0
								)}{' '}
								<Trans i18nKey='items' />) : $
								{cartItems.reduce(
									(a, c) => a + c.wsPrice * c.qty,
									0
								)}
							</h2>
						</li>

						<li>
							<h2>
								<Trans i18nKey='amountSaved' />: $
								{cartItems.reduce(
									(a, c) => a + c.price * c.qty,
									0
								) -
									cartItems.reduce(
										(a, c) => a + c.wsPrice * c.qty,
										0
									)}
							</h2>
						</li>

						<li>
							<button
								type='button'
								onClick={checkoutHandler}
								className='primary block'
								disabled={
									cartItems.length === 0 ||
									cartItems.reduce(
										(a, c) => a + c.wsPrice * c.qty,
										0
									) < 100
								}
							>
								<Trans i18nKey='proceedToCheckout' /> ($100{' '}
								<Trans i18nKey='minimum' />)
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
