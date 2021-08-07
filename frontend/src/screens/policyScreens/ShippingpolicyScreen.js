import React from 'react'

const ShippingPolicyScreen = () => {
	return (
		<div>
			<div className='policy'>
				<div className='center'>
					<h1>Returns</h1>
				</div>
				<div>
					<h2>ONLY DOMESTIC SHIPPING</h2>
					<div>
						We currently only offer domestic shipping to the 50
						states. It generally takes 1-3 days for the package to
						arrive after the package is shipped, though it may take
						longer due to unexpected delays or holidays. Please feel
						free to check the picture of the tracking number that
						should be attached to your order confirmation email.
					</div>
					<h2>Processing orders</h2>
					<div>
						Orders are shipped out Mondays-Fridays. Though if an
						order is placed after 5PM EST of that date, it will
						likely be pushed to the following day. Any
						inconsistencies with the order being shipped to the
						wrong address will result in a $10 fee to correct it. We
						are not responsible for lost or stolen packages or
						packages delayed by the carrier.
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShippingPolicyScreen
