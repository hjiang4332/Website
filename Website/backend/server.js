/* Entry point of backend application */
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/classyjewelry', {
    useNewUrlParser: true, //get rid of warnings
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})

