import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function PlaceOrderScreen(props) {
	//Must select payment option before placing order
	const cart = useSelector((state) => state.cart)
	if (!cart.paymentMethod) {
		props.history.push('/payment')
	}

	const orderCreate = useSelector((state) => state.orderCreate)
	const { loading, success, error, order } = orderCreate

	//calculate prices
	const toPrice = (num) => Number(num.toFixed(2))
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.wsPrice * c.qty, 0)
	)
	cart.shippingPrice =
		cart.paymentMethod === 'Ship My Order' ? toPrice(10) : toPrice(0)
	cart.taxPrice = toPrice(0.03 * cart.itemsPrice)
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

	//create the order
	const dispatch = useDispatch()
	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
	}

	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._id}`)
			dispatch({ type: ORDER_CREATE_RESET })
		}
	}, [dispatch, order, props.history, success])

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className='row top'>
				<div className='col-2'>
					<ul>
						<li>
							<div className='card card-body'>
								<h2>Shipping</h2>
								<p>
									<strong>Name:</strong>{' '}
									{cart.shippingAddress.fullName} <br />
									<strong>Address: </strong>{' '}
									{cart.shippingAddress.address},
									{cart.shippingAddress.city},{' '}
									{cart.shippingAddress.postalCode},
									{cart.shippingAddress.country}
								</p>
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>Payment</h2>
								<p>
									<strong>Method:</strong>{' '}
									{cart.paymentMethod}
								</p>
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>Order Items</h2>
								<ul>
									{cart.cartItems.map((item) => (
										<li
											key={
												item.product +
												item.color +
												item.size
											}
										>
											<div className='row'>
												<div>
													<img
														src={item.image}
														alt={item.name}
														className='small'
													></img>
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
														{item.name}
													</Link>
												</div>

												{item.color !== '0' && (
													<div>
														Color: {item.color}
													</div>
												)}
												{item.size !== 0 && (
													<div>Size: {item.size}</div>
												)}

												<div>
													<span className='pad-right'>
														{item.onSale ? (
															<span>
																On Sale:{' '}
																{item.wsPrice}
																ea.
															</span>
														) : (
															<span>
																${item.wsPrice}
																ea.
															</span>
														)}
													</span>

													<span>
														Total cost: {item.qty} x{' '}
														{item.wsPrice}=$
														{item.wsPrice *
															item.qty}
													</span>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>

				<div className='col-1'>
					<div className='card card-body'>
						<ul>
							<li>
								<h2>Order Summary</h2>
							</li>

							<li>
								<div className='row'>
									<div>Items</div>
									<div>${cart.itemsPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>Shipping</div>
									<div>${cart.shippingPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>Card Fee: </div>
									<div>${cart.taxPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<strong> Order Total</strong>
									</div>
									<div>
										<strong>
											${cart.totalPrice.toFixed(2)}
										</strong>
									</div>
								</div>
							</li>

							<li>
								<button
									type='button'
									onClick={placeOrderHandler}
									className='primary block'
									disabled={
										cart.cartItems.length === 0 ||
										cart.itemsPrice.toFixed(2) < 100
									}
								>
									Save Order and Go To Payment
								</button>
							</li>

							{loading && <LoadingBox></LoadingBox>}
							{error && (
								<MessageBox variant='danger'>
									{error}
								</MessageBox>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
