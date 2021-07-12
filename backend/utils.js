import jwt from 'jsonwebtoken'

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
