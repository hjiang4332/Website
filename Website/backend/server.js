/* Entry point of backend application */
import express from 'express'
import data from './data.js' /* append extension here for server side */

const app = express();

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product not Found'})
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/', (req, res) => {
    res.send('Server is ready')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})