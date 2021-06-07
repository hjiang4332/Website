import React from 'react'
import Product from '../components/Product'
import Rating from '../components/Rating'
import data from '../data'

export default function ProductScreen(props){
    const product = data.products.find(x => x._id === props.match.params.id)
    if(!product){
        return <div> Product Not Found </div>
    }
    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <img className="large" src={Product.image} alt={Product.name} />
                </div>

                <div className="col-1">
                    <ul>
                        <li><h1>{product.name}</h1></li>
                        <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                        <li>Price: ${product.price}</li>
                        <li><p>{product.description}</p></li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div>Price</div>
                                <div className="price">${product.price}</div>
                            </li>

                            <li>
                                <div>Status</div>
                                <div>{product.countInStock>0 ? <span className="success">In Stock</span> : <span className="error">Unavailable</span>}</div>
                            </li>

                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}