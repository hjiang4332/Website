import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		type: { type: String, default: 'Regular', required: true },
		numOrders: { type: Number, default: 0 },
		totalSpent: { type: Number, default: 0 },
		isAdmin: { type: Boolean, default: false, required: true },
	},
	{
		timestamps: true,
	}
)
const User = mongoose.model('User', userSchema)

export default User
