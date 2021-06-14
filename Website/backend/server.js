/* Entry point of backend application */
import express from 'express'
import mongoose from 'mongoose'
// import data from "./data.js"
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'

const app = express()
mongoose.connect(
	process.env.MONGODB_URL || 'mongodb://localhost/classyjewelry',
	{
		useNewUrlParser: true, //get rid of warnings
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
)

//static data that requires id implementation
// app.get('/api/products/:id', (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.get('/', (req, res) => {
	res.send('Server is ready')
})

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`)
})
