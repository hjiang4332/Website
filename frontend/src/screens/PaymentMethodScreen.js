import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { Trans } from 'react-i18next'

export default function PaymentMethodScreen(props) {
	//need shipping address saved before you can go to payment screen
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	if (!shippingAddress.address) {
		props.history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('Ship My Order')

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

	const dispatch = useDispatch()
	const placeOrderHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
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
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className='form'>
				<div>
					<h1>
						<Trans i18nKey='pickupMethod' />
					</h1>
				</div>

				<div>
					<div>
						<input
							type='radio'
							id='ship'
							value='Ship'
							name='paymentMethod'
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor='ship'>
							<Trans i18nKey='shipMyOrder' /> ($100 minimum, +$10)
						</label>
					</div>
				</div>

				<div>
					<div>
						<input
							type='radio'
							id='pickup'
							value='Pick up at Store'
							name='paymentMethod'
							required
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor='pickup'>
							<Trans i18nKey='pickUpAtStore' /> ($50 minimum)
						</label>
					</div>
				</div>

				<div>
					<label />
					<button
						type='button'
						onClick={placeOrderHandler}
						className='primary block'
						disabled={
							cart.cartItems.length === 0
							/*||
                            cart.paymentMethod === 'Ship My Order'
                                ? cart.itemsPrice.toFixed(2) < 100
                                : cart.itemsPrice.toFixed(2) < 50*/
						}
					>
						<Trans i18nKey='saveOrderAndGoToPayment' />
					</button>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
			</form>
		</div>
	)
}
