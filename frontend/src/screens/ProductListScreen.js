import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET,
} from '../constants/productConstants'

export default function ProductListScreen(props) {
	//get productList from redux store - display products
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	//get productCreate from redux store - create products
	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	const dispatch = useDispatch()
	useEffect(() => {
		//if its a created product, redirect to that product edit screen
		if (successCreate) {
			dispatch({ type: PRODUCT_CREATE_RESET })
			props.history.push(`/product/${createdProduct._id}/edit`)
		}
		if (successDelete) {
			dispatch({ type: PRODUCT_DELETE_RESET })
		}
		dispatch(listProducts())
	}, [createdProduct, dispatch, props.history, successCreate, successDelete])

	const deleteHandler = (product) => {
		if (window.confirm('Are you sure you want to delete?')) {
			dispatch(deleteProduct(product._id))
		}
	}

	const createHandler = () => {
		dispatch(createProduct())
	}
	return (
		<div>
			<div className='row'>
				<h1>Products</h1>
				<button
					type='button'
					className='primary'
					onClick={createHandler}
				>
					Create Product
				</button>
			</div>

			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && (
				<MessageBox variant='danger'>{errorDelete}</MessageBox>
			)}

			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && (
				<MessageBox variant='danger'>{errorCreate}</MessageBox>
			)}

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