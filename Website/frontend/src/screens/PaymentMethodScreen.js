import React from 'react'

export default function PaymentMethodScreen() {
	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>Payment</h1>
				</div>

				<div>
					<div>
						<input
							type='radio'
							id='paypal'
							value='PayPal'
							name='paymentMethod'
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor='paypal'>PayPal</label>
					</div>
				</div>

				<div>
					<div>
						<input
							type='radio'
							id='stripe'
							value='Stripe'
							name='paymentMethod'
							required
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label htmlFor='stripe'>Stripe</label>
					</div>
				</div>

				<div>
					<button className='primary' type='submit'>
						Continue
					</button>
				</div>
			</form>
		</div>
	)
}
