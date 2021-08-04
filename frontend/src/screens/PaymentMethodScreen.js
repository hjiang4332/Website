import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
	//need shipping address saved before you can go to payment screen
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	if (!shippingAddress.address) {
		props.history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('Ship My Order')

	const dispatch = useDispatch()
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		props.history.push('/placeorder')
	}

	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>Pickup Method</h1>
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
						<label htmlFor='ship'>Ship My Order</label>
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
						<label htmlFor='pickup'>Pick up at Store</label>
					</div>
				</div>

				<div>
					<label />
					<button className='primary' type='submit'>
						Continue
					</button>
				</div>
			</form>
		</div>
	)
}
