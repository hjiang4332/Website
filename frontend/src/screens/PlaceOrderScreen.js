import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { Trans } from 'react-i18next'

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
	cart.taxPrice =
		cart.itemsPrice < 100 ? toPrice(0.03 * cart.itemsPrice) : toPrice(0)
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
								<h2>
									<Trans i18nKey='shipping' />
								</h2>
								<p>
									<strong>
										<Trans i18nKey='name' />:
									</strong>{' '}
									{cart.shippingAddress.fullName} <br />
									<strong>
										<Trans i18nKey='address' />:{' '}
									</strong>{' '}
									{cart.shippingAddress.address},
									{cart.shippingAddress.city},{' '}
									{cart.shippingAddress.state}
									{cart.shippingAddress.postalCode},
								</p>
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>
									<Trans i18nKey='pickupMethod' />:
								</h2>
								<p>{cart.paymentMethod}</p>
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>
									<Trans i18nKey='order' />
								</h2>
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
														<Trans i18nKey='color' />
														: {item.color}
													</div>
												)}
												{item.size !== 0 && (
													<div>
														<Trans i18nKey='size' />
														: {item.size}
													</div>
												)}

												<div>
													<span className='pad-right'>
														{item.onSale ? (
															<span>
																<Trans i18nKey='onSale' />
																: {item.wsPrice}
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
														<Trans i18nKey='total' />
														: {item.qty} x{' '}
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
								<h2>
									<Trans i18nKey='orderSummary' />
								</h2>
							</li>

							<li>
								<div className='row'>
									<div>
										<Trans i18nKey='Items' />
									</div>
									<div>${cart.itemsPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<Trans i18nKey='shipping' />
									</div>
									<div>${cart.shippingPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<Trans i18nKey='cardFee' />:{' '}
									</div>
									<div>${cart.taxPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<strong>
											<Trans i18nKey='total' />
										</strong>
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
										cart.paymentMethod === 'Ship My Order'
											? cart.itemsPrice.toFixed(2) < 100
											: cart.itemsPrice.toFixed(2) < 50
									}
								>
									<Trans i18nKey='saveOrderAndGoToPayment' />
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
