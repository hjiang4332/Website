import jwt from 'jsonwebtoken'
import mg from 'mailgun-js'

//token generated when a user signs in for authentication
export const generateToken = (user) => {
	//.sign (object used for generating token), jsonwebtokensecret (key to encrypt), expiration time
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || 'somethingsecret',
		{
			expiresIn: '365d',
		}
	)
}

//to Authenticate user. Used in orderRouter.post to fill user info.
export const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization
	if (authorization) {
		const token = authorization.slice(7, authorization.length)
		jwt.verify(
			token,
			process.env.JWT_SECRET || 'somethingsecret',
			(err, decode) => {
				if (err) {
					res.status(401).send({ message: 'Invalid Token' })
				} else {
					req.user = decode
					next()
				}
			}
		)
	} else {
		res.status(401).send({ message: 'No Token' })
	}
}

//to authenticate an admin - Used in app.js to show the dropdown.
export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401).send({ message: 'Invalid Admin Token' })
	}
}

//mailgun
export const mailgun = () =>
	mg({
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	})

export const payOrderEmailTemplate = (order) => {
	return `<h1>Thanks for shopping with us</h1>
  <p>
  Hello ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Color</strong></td>
  <td><strong>Size</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
		.map(
			(item) => `
    <tr>
    <td>${item.name}</td>
    <td>${item.color ? item.color : ''}</td>
    <td>${item.size ? item.size : ''}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.wsPrice.toFixed(2)}</td>
    </tr>
  `
		)
		.join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Fees:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Pickup Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.state},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `
}
