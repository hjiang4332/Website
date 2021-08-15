import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	deliverOrder,
	getOrderDetails,
	payOrder,
} from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET,
} from '../constants/orderConstants'

import { Trans } from 'react-i18next'

export default function OrderScreen(props) {
	const orderId = props.match.params.id

	//paypal
	const [sdkReady, setSdkReady] = useState(false)

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	//get order pay from redux
	const orderPay = useSelector((state) => state.orderPay)
	const {
		loading: loadingPay,
		error: errorPay,
		success: successPay,
	} = orderPay

	const orderDeliver = useSelector((state) => state.orderDeliver)
	const {
		loading: loadingDeliver,
		error: errorDeliver,
		success: successDeliver,
	} = orderDeliver

	const dispatch = useDispatch()
	useEffect(() => {
		const addPayPalScript = async () => {
			//create element with JS
			const { data } = await Axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://www.paypal.com/sdk/js?client-id=${data}&enable-funding=venmo&disable-funding=credit`
			script.async = true
			script.onload = () => {
				setSdkReady(true)
			}
			//add script to last child of body
			document.body.appendChild(script)
		}
		if (
			!order ||
			successPay ||
			successDeliver ||
			(order && order._id !== orderId)
		) {
			dispatch({ type: ORDER_PAY_RESET }) //reset to prevent infinite loading
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(orderId))
		} else {
			if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript()
				} else {
					setSdkReady(true)
				}
			}
		}
	}, [dispatch, order, orderId, sdkReady, successPay, successDeliver])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(order, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order._id))
	}

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant='danger'>{error}</MessageBox>
	) : (
		<div>
			<h1>
				<Trans i18nKey='order' /> {order._id}{' '}
				<Trans i18nKey='hasBeenSaved' />
			</h1>
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
									{order.shippingAddress.fullName} <br />
									<strong>
										<Trans i18nKey='address' />:{' '}
									</strong>{' '}
									{order.shippingAddress.address},
									{order.shippingAddress.city},{' '}
									{order.shippingAddress.postalCode},
									{order.shippingAddress.country}
								</p>

								{order.isDelivered ? (
									<MessageBox variant='success'>
										<Trans i18nKey='deliveryDate' />{' '}
										{order.deliveredAt}
									</MessageBox>
								) : (
									<MessageBox variant='danger'>
										<Trans i18nKey='notDelivered' />
									</MessageBox>
								)}
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>
									<Trans i18nKey='pickupMethod' />:
								</h2>

								<p>{order.paymentMethod}</p>

								{order.isPaid ? (
									<MessageBox variant='success'>
										<Trans i18nKey='paidDate' />{' '}
										{order.paidAt}
									</MessageBox>
								) : (
									<MessageBox variant='danger'>
										<Trans i18nKey='notPaid' />
									</MessageBox>
								)}
							</div>
						</li>

						<li>
							<div className='card card-body'>
								<h2>
									<Trans i18nKey='order' />
								</h2>
								<ul>
									{order.orderItems.map((item) => (
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

												{item.color !== '0' ? (
													<div>
														<Trans i18nKey='color' />
														: {item.color}
													</div>
												) : (
													<div />
												)}

												{item.size !== 0 ? (
													<div>
														<Trans i18nKey='size' />
														: {item.size}
													</div>
												) : (
													<div />
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
										<Trans i18nKey='items' />
									</div>
									<div>${order.itemsPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<Trans i18nKey='shipping' />
									</div>
									<div>${order.shippingPrice.toFixed(2)}</div>
								</div>
							</li>

							<li>
								<div className='row'>
									<div>
										<Trans i18nKey='cardFee' />
									</div>
									<div>${order.taxPrice.toFixed(2)}</div>
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
											${order.totalPrice.toFixed(2)}
										</strong>
									</div>
								</div>
							</li>

							{!order.isPaid && (
								<li>
									{!sdkReady ? (
										<LoadingBox></LoadingBox>
									) : (
										<>
											{errorPay && (
												<MessageBox variant='danger'>
													{errorPay}
												</MessageBox>
											)}
											{loadingPay && (
												<LoadingBox></LoadingBox>
											)}

											<PayPalButton
												amount={order.totalPrice}
												onSuccess={
													successPaymentHandler
												}
											/>
										</>
									)}
								</li>
							)}

							{userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<li>
										{loadingDeliver && (
											<LoadingBox></LoadingBox>
										)}
										{errorDeliver && (
											<MessageBox variant='danger'>
												{errorDeliver}
											</MessageBox>
										)}
										<button
											type='button'
											className='primary block'
											onClick={deliverHandler}
										>
											<Trans i18nKey='deliverOrder' />
										</button>
									</li>
								)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
