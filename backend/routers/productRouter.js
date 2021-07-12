import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router()

//populate with previously created products
productRouter.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const pageSize = 20
		const page = Number(req.query.pageNumber) || 1

		const name = req.query.name || ''
		const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}

		const category = req.query.category || ''
		const categoryFilter = category ? { category } : {}

		const quality = req.query.quality || ''
		const qualityFilter = quality ? { quality } : {}

		const order = req.query.order || ''
		const min =
			req.query.min && Number(req.query.min) !== 0
				? Number(req.query.min)
				: 0
		const max =
			req.query.max && Number(req.query.max) !== 0
				? Number(req.query.max)
				: 0

		const priceFilter =
			min && max ? { price: { $gte: min, $lte: max } } : {}
		const sortOrder =
			order === 'lowest'
				? { price: 1 }
				: order === 'highest'
				? { price: -1 }
				: { _id: -1 }

		const count = await Product.count({
			...nameFilter,
			...categoryFilter,
			...qualityFilter,
			...priceFilter,
		})

		const products = await Product.find({
			...nameFilter,
			...categoryFilter,
			...qualityFilter,
			...priceFilter,
		})
			.sort(sortOrder)
			.skip(pageSize * (page - 1))
			.limit(pageSize)

		res.send({ products, page, pages: Math.ceil(count / pageSize) })
	})
)

//get distinct categories from products
productRouter.get(
	'/categories',
	expressAsyncHandler(async (req, res) => {
		const categories = await Product.find().distinct('category')
		res.send(categories)
	})
)

//get distinct qualities from products
productRouter.get(
	'/qualities',
	expressAsyncHandler(async (req, res) => {
		const qualities = await Product.find().distinct('quality')
		res.send(qualities)
	})
)

//create products
productRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		//await Product.remove({})
		const createdProducts = await Product.insertMany(data.products)
		res.send({ createdProducts })
	})
)

//product exists authentication
productRouter.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)
		if (product) {
			res.send(product)
		} else {
			res.status(404).send({ message: 'Product Not Found' })
		}
	})
)

//ProductListScreen: admin screen create products
productRouter.post(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = new Product({
			name: 'sample name ' + Date.now(),
			quality: 'Gold Filled',
			category: 'sample category',
			image: '/images/p1.jpg',
			price: 0,
			wsPrice: 0,
			wzPrice: 0,
			countInStock: 0,
			description: 'sample description',
		})

		const createdProduct = await product.save()
		res.send({ message: 'Product Created', product: createdProduct })
	})
)

//ProductEditScreen: product update
productRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const productId = req.params.id
		const product = await Product.findById(productId)

		if (product) {
			product.name = req.body.name
			product.quality = req.body.quality
			product.category = req.body.category
			product.image = req.body.image
			product.price = req.body.price
			product.wsPrice = req.body.wsPrice
			product.wzPrice = req.body.wzPrice
			product.countInStock = req.body.countInStock
			product.description = req.body.description

			const updatedProduct = await product.save()
			res.send({ message: 'Product Updated', product: updatedProduct })
		} else {
			res.status(404).send({ message: 'Product Not Found' })
		}
	})
)

//ProductListScreen: delete product
productRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)
		if (product) {
			const deleteProduct = await product.remove()
			res.send({ message: 'Product Deleted', product: deleteProduct })
		} else {
			res.status(404).send({ message: 'Product Not Found' })
		}
	})
)

export default productRouter
