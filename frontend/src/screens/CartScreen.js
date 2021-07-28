import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox'

export default function CartScreen(props) {
	const productId = props.match.params.id
	// const qty = props.location.search
	// 	? Number(props.location.search.split('=')[1])
	// 	: 1
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	let params = new URLSearchParams(document.location.search.substring(1))
	let qty = params.get('qty') ? params.get('qty') : 1
	let color = params.get('color') ? params.get('color') : '0'
	let size = params.get('size') ? params.get('size') : 0
	//console.log('yo: ' + qty, color, size)

	const dispatch = useDispatch()
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty, color, size))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		props.history.push('/signin?redirect=shipping')
	}
	return (
		<div className='row top'>
			<div className='col-2'>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<MessageBox>
						Your cart is empty. <Link to='/'>Go Shopping</Link>
					</MessageBox>
				) : (
					<ul>
						{cartItems.map((item) => (
							<li key={item.product}>
								<div className='row'>
									<div>
										<img
											src={item.image}
											alt={item.name}
											className='small'
										/>
									</div>

									<div className='min-30'>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</div>

									<span>{'Color: ' + item.color}</span>
									<span>{'Size : ' + item.size}</span>

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

									<div>${item.price} ea.</div>

									<div>
										Total cost: ${item.price * item.qty}
									</div>

									{/* Remove Item */}
									<div>
										<button
											type='button'
											onClick={() =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											Remove item
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
								Subtotal (
								{cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
								items) : $
								{cartItems.reduce(
									(a, c) => a + c.price * c.qty,
									0
								)}
							</h2>
						</li>
						<li>
							<button
								type='button'
								onClick={checkoutHandler}
								className='primary block'
								disabled={cartItems.length === 0}
							>
								Proceed to Checkout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
