/* Entry point of backend application */
import express from 'express'
import data from './data.js' /* append extension here for server side */

const app = express();

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