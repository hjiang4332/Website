import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

import { Trans } from 'react-i18next'

export default function ShippingAddressScreen(props) {
	//make sure users are signed in before shipping
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin
	if (!userInfo) {
		props.history.push('/signin')
	}

	//get data from previous order to prefill shipping address
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [fullName, setFullName] = useState(shippingAddress.fullName)
	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [state, setState] = useState(shippingAddress.state)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			saveShippingAddress({
				fullName,
				address,
				city,
				state,
				postalCode,
			})
		)
		props.history.push('/payment')
	}

	return (
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>
						<Trans i18nKey='shippingAddress' />
					</h1>
					<div>
						<Trans i18nKey='shippingDescription' />
					</div>
				</div>

				<div>
					<label htmlFor='fullName'>
						<Trans i18nKey='fullName' />
					</label>
					<input
						type='text'
						id='fullName'
						placeholder='Enter your full name'
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor='address'>
						<Trans i18nKey='address' />
					</label>
					<input
						type='text'
						id='address'
						placeholder='Enter your address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor='city'>
						<Trans i18nKey='city' />
					</label>
					<input
						type='text'
						id='city'
						placeholder='Enter your city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor='state'>
						<Trans i18nKey='state' />
					</label>
					<input
						type='text'
						id='state'
						placeholder='Enter your state'
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor='postalCode'>
						<Trans i18nKey='postalCode' />
					</label>
					<input
						type='text'
						id='postalCode'
						placeholder='Enter your postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</div>

				<div>
					<label />
					<button className='primary' type='submit'>
						<Trans i18nKey='continue' />
					</button>
				</div>
			</form>
		</div>
	)
}
