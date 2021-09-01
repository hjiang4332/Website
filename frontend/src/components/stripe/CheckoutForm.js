import React from 'react'
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js'

import CardSection from './CardSection'

class CheckoutForm extends React.Component {
	handleSubmit = async (event) => {
		event.preventDefault()

		const { stripe, elements } = this.props
		if (!stripe || !elements) {
			return
		}

		const card = elements.getElement(CardElement)
		const result = await stripe.createToken(card)
		if (result.error) {
			console.log(result.error.message)
		} else {
			console.log(result.token)
		}
	}

	render() {
		return (
			<div>
				{/*
                <div className='product-info'>
					<h3 className='product-title'>Apple MacBook Pro</h3>
					<h4 className='product-price'>$999</h4>
				</div>
                */}
				<form onSubmit={this.handleSubmit}>
					<CardSection />
					<button disabled={!this.props.stripe} className='btn-pay'>
						Checkout With Card
					</button>
				</form>
			</div>
		)
	}
}

export default function InjectedCheckoutForm() {
	return (
		<ElementsConsumer>
			{({ stripe, elements }) => (
				<CheckoutForm stripe={stripe} elements={elements} />
			)}
		</ElementsConsumer>
	)
}
