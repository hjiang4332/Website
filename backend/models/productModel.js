import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		quality: { type: String, required: true },
		category: { type: String, required: true },
		image: { type: String, required: true },
		images: [String],
		price: { type: Number, required: true },
		wsPrice: { type: Number, required: true },
		wzPrice: { type: Number, required: true },
		onSale: { type: Boolean },
		countInStock: { type: Number, required: true },
		customizations: [
			{
				color: { type: String },
				size: { type: Number },
				countInStock: { type: Number },
			},
		],
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model('Product', productSchema)

export default Product
