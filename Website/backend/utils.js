import jwt from 'jsonwebtoken'

//token generated when a user signs in for authentication
export const generateToken = (user) => {
	//.sign (object used for generating token), jsonwebtokensecret (key to encrypt), expiration time
	return jwt.sign(
		{
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || 'somethingsecret',
		{
			expiresIn: '30d',
		}
	)
}
