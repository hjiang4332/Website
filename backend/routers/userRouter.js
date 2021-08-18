import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import data from '../data.js'
import User from '../models/userModel.js'
import { generateToken, isAdmin, isAuth } from '../utils.js'
import Order from '../models/orderModel.js'

const userRouter = express.Router()

//populate with previously created users
/*userRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		//await User.remove({})
		const createdUsers = await User.insertMany(data.users)
		res.send({ createdUsers })
	})
)*/

//user signin email and password authentication
userRouter.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email })
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				})
				return
			}
		}
		res.status(401).send({ message: 'Invalid email or password' })
	})
)

//register route - post because creating something
userRouter.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		})

		const createdUser = await user.save()
		res.send({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			isAdmin: createdUser.isAdmin,
			token: generateToken(createdUser),
		})
	})
)

//Profile screen - shows user info backend
userRouter.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id)
		if (user) {
			res.send(user)
		} else {
			res.status(404).send({ message: 'User Not Found' })
		}
	})
)

//profile screen - user updates own info - prevent 404 error - put updates path profile
userRouter.put(
	'/profile',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id)
		if (user) {
			user.name = req.body.name || user.name
			user.email = req.body.email || user.email
			//user.whateveryouadded = req.body.whateveryouadded || user.whateveryouadded
			if (req.body.password) {
				user.password = bcrypt.hashSync(req.body.password, 8)
			}
			const updatedUser = await user.save()
			res.send({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser),
			})
		}
	})
)

//UserListScreen - get users
userRouter.get(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({})
		res.send(users)
	})
)

//UserListScreen - delete users
userRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id)
		if (user) {
			if (user.email === 'classyjewelryws@gmail.com') {
				res.status(400).send({ message: 'Can Not Delete Admin User' })
				return
			}
			await Order.deleteMany({ user: user._id })
			const deleteUser = await user.remove()
			res.send({ message: 'User Deleted', user: deleteUser })
		} else {
			res.status(404).send({ message: 'User Not Found' })
		}
	})
)

//UserEditScreen - edit user information
userRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id)
		if (user) {
			user.name = req.body.name || user.name
			user.email = req.body.email || user.email
			user.type = req.body.type || user.type
			user.isAdmin = Boolean(req.body.isAdmin)
			const updatedUser = await user.save()
			res.send({ message: 'User Updated', user: updatedUser })
		} else {
			res.status(404).send({ message: 'User Not Found' })
		}
	})
)

export default userRouter
