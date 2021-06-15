import jwt from 'jsonwebtoken'
export const generateToken = (user) => {
    //.sign (object used for generating token), jsonwebtokensecret (key to encrypt), expiration time
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    )
}