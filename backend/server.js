import http from 'http'
import { Server } from 'socket.io'

import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import config from './config.js'

import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'
import uploadRouter from './routers/uploadRouter.js'

const app = express()

//avoids no email error from postman
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongodb connection
mongoose.connect(config.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID || 'sb')
})

//makes sure images shows up after uploading
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//heroku
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) =>
	res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
)

//browser message
// app.get('/', (req, res) => {
// 	res.send('Server is ready')
// })

//error messages
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message })
})

const httpServer = http.Server(app)
const io = new Server(httpServer, { cors: { origin: '*' } })
const users = []

io.on('connection', (socket) => {
	//disconnect handler
	socket.on('disconnect', () => {
		const user = users.find((x) => x.socketId === socket.id)
		if (user) {
			user.online = false
			console.log('Offline', user.name)
			const admin = users.find((x) => x.isAdmin && x.online)

			if (admin) {
				io.to(admin.socketId).emit('updateUser', user)
			}
		}
	})

	socket.on('onLogin', (user) => {
		const updatedUser = {
			...user,
			online: true,
			socketId: socket.id,
			messages: [],
		}
		const existUser = users.find((x) => x._id === updatedUser._id)

		//update socket id and make online, or push user to new user array
		if (existUser) {
			existUser.socketId = socket.id
			existUser.online = true
		} else {
			users.push(updatedUser)
		}
		console.log('Online', user.name)

		//update user is admin is online
		const admin = users.find((x) => x.isAdmin && x.online)
		if (admin) {
			io.to(admin.socketId).emit('updateUser', updatedUser)
		}

		//show users to admins
		if (updatedUser.isAdmin) {
			io.to(updatedUser.socketId).emit('listUsers', users)
		}
	})

	socket.on('onUserSelected', (user) => {
		const admin = users.find((x) => x.isAdmin && x.online)

		//pass current user info to selectUser
		if (admin) {
			const existUser = users.find((x) => x._id === user._id)
			io.to(admin.socketId).emit('selectUser', existUser)
		}
	})

	socket.on('onMessage', (message) => {
		if (message.isAdmin) {
			const user = users.find((x) => x._id === message._id && x.online)
			if (user) {
				io.to(user.socketId).emit('message', message)
				user.messages.push(message)
			}
		} else {
			const admin = users.find((x) => x.isAdmin && x.online)
			if (admin) {
				io.to(admin.socketId).emit('message', message)
				const user = users.find(
					(x) => x._id === message._id && x.online
				)
				user.messages.push(message)
			} else {
				io.to(socket.id).emit('message', {
					name: 'Admin',
					body: 'Sorry, I am not online right now',
				})
			}
		}
	})
})

httpServer.listen(config.PORT, () => {
	console.log(`Serve at http://localhost:${config.PORT}`)
})

//console message
// const port = process.env.PORT || 5000
// app.listen(port, () => {
// 	console.log(`Serve at http://localhost:${port}`)
// })
