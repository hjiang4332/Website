import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		itemNumber: { type: String, required: true, unique: true },
		name: { type: String, required: true, unique: true },
		quality: { type: String, required: true },
		category: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
		wsPrice: { type: Number, required: true },
		wzPrice: { type: Number, required: true },
		countInStock: { type: Number, required: true },
		colors: { type: String, required: true },
		sizes: { type: String, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model('Product', productSchema)

// bsizes: [{ size: String, price: Number }]

export default Product
