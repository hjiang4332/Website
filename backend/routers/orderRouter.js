import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAdmin, isAuth } from '../utils.js'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'

const orderRouter = express.Router()

//OrderListScreen: Show orders
orderRouter.get(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find({}).populate('user', 'name')
		res.send(orders)
	})
)

//DashboardScreen - order summary
orderRouter.get(
	'/summary',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.aggregate([
			{
				$group: {
					_id: null,
					numOrders: { $sum: 1 },
					totalSales: { $sum: '$totalPrice' },
				},
			},
		])
		const users = await User.aggregate([
			{
				$group: {
					_id: null,
					numUsers: { $sum: 1 },
				},
			},
		])
		const dailyOrders = await Order.aggregate([
			{
				$group: {
					_id: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$createdAt',
						},
					},
					orders: { $sum: 1 },
					sales: { $sum: '$totalPrice' },
				},
			},
			{ $sort: { _id: 1 } },
		])
		const productCategories = await Product.aggregate([
			{
				$group: {
					_id: '$category',
					count: { $sum: 1 },
				},
			},
		])
		res.send({ users, orders, dailyOrders, productCategories })
	})
)

// OrderActions - > placeOrderScreen: create an order
orderRouter.get(
	'/mine',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find({ user: req.user._id })
		res.send(orders)
	})
)

orderRouter.post(
	'/',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		//await Order.remove({})

		if (req.body.orderItems.length === 0) {
			res.status(400).send({ message: 'Cart is empty' })
		} else {
			const order = new Order({
				orderItems: req.body.orderItems,
				shippingAddress: req.body.shippingAddress,
				paymentMethod: req.body.paymentMethod,
				itemsPrice: req.body.itemsPrice,
				shippingPrice: req.body.shippingPrice,
				taxPrice: req.body.taxPrice,
				totalPrice: req.body.totalPrice,
				user: req.user._id,
			})
			const createdOrder = await order.save()
			res.status(201).send({
				message: 'New Order Created',
				order: createdOrder,
			})
		}
	})
)

//CreateOrderScreen: get order information
orderRouter.get(
	'/:id',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (order) {
			res.send(order)
		} else {
			res.status(404).send({ message: 'Order Not Found' })
		}
	})
)

//OrderScreen: pay order
orderRouter.put(
	'/:id/pay',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (order) {
			order.isPaid = true
			order.paidAt = Date.now()
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address,
			}
			const updatedOrder = await order.save()

			//subtract count in stock by amount paid for OLD
			/*for (const index in updatedOrder.orderItems) {
				const item = updatedOrder.orderItems[index]
				const product = await Product.findById(item.product)
				product.countInStock -= item.qty
				product.sold += item.qty
				await product.save()
			}*/

			//update count in stock - new
			for (const index in updatedOrder.orderItems) {
				const item = updatedOrder.orderItems[index] //get each item from orderItems array
				const product = await Product.findById(item.product) //find product that corresponds with each item in orderItems array

				product.customizations.length > 0
					? product.customizations.map((productItem) =>
							productItem.color.toString() ===
								item.color.toString() &&
							Number(productItem.size) === Number(item.size)
								? {
										...item,
										countInStock: (countInStock -=
											item.qty),
								  }
								: item
					  )
					: (product.countInStock -= item.qty)

				await product.save()
			}

			res.send({ message: 'Order Paid', order: updatedOrder })
		} else {
			res.status(404).send({ message: 'Order Not Found' })
		}
	})
)

//delete order
orderRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (order) {
			const deleteOrder = await order.remove()
			res.send({ message: 'Order Deleted', order: deleteOrder })
		} else {
			res.status(404).send({ message: 'Order Not Found' })
		}
	})
)

//deliver order
orderRouter.put(
	'/:id/deliver',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (order) {
			order.isDelivered = true
			order.deliveredAt = Date.now()

			const updatedOrder = await order.save()
			res.send({ message: 'Order Delivered', order: updatedOrder })
		} else {
			res.status(404).send({ message: 'Order Not Found' })
		}
	})
)

export default orderRouter
