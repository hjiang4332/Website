import mongoose from 'mongoose'

const customizeSchema = new mongoose.Schema({
	size: { type: String, required: true },
	color: { type: String, required: true },
	countInStock: { type: Number, required: true },
	price: { type: Number, required: true },
	wsPrice: { type: Number, required: true },
	wzPrice: { type: Number, required: true },
})

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
		salePrice: { type: Number },
		countInStock: { type: Number, required: true },
		customizations: [
			{
				countInStock: { type: Number },
				color: { type: String },
				size: { type: String },
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
