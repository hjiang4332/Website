import dotenv from 'dotenv'

dotenv.config()

export default {
	PORT: process.env.PORT || 5000,
	MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/classyjewelry',
	JWT_SECRET: process.env.JWT_SECRET || 'ayoyeetthissecret',
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
	accessKeyId: process.env.accessKeyId || 'accessKeyId',
	secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}
