import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function ProductListScreen(props) {
	//get productList from redux store
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	const deleteHandler = () => {
		/// TODO: dispatch delete action
	}
	return (
		<div>
			<h1>Products</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>CATEGORY</th>
							<th>Count In Stock</th>
							<th>PRICE</th>
							<th>WSPRICE</th>
							<th>WZPRICE</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{product.category}</td>
								<td>{product.countInStock}</td>
								<td>${product.price}</td>
								<td>${product.wsPrice}</td>
								<td>${product.wzPrice}</td>
								<td>
									<button
										type='button'
										className='small'
										onClick={() =>
											props.history.push(
												`/product/${product._id}/edit`
											)
										}
									>
										Edit
									</button>

									<button
										type='button'
										className='small'
										onClick={() => deleteHandler(product)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
