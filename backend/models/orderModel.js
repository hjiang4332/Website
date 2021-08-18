import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				wsPrice: { type: Number, required: true },
				costPrice: { type: Number, required: true },
				onSale: { type: Boolean },
				customizations: [
					{
						style: { type: String },
						size: { type: Number },
						countInStock: { type: Number },
					},
				],
				style: { type: String },
				size: { type: Number },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],

		shippingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			postalCode: { type: String, required: true },
		},

		paymentMethod: { type: String, required: true },
		paymentResult: {
			id: String,
			status: String,
			update_time: String,
			email_address: String,
		},

		itemsPrice: { type: Number, required: true },
		shippingPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
	},
	{
		timestamps: true,
	}
)
const Order = mongoose.model('Order', orderSchema)
export default Order
