import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

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
	const { pageNumber = 1 } = useParams()

	//get productList from redux store - display products
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

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
		dispatch(listProducts({ pageNumber }))
	}, [
		createdProduct,
		dispatch,
		props.history,
		successCreate,
		successDelete,
		pageNumber,
	])

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
				<>
					<table className='table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>ITEMNUMBER</th>
								<th>NAME</th>
								<th>QUALITY</th>
								<th>CATEGORY</th>
								<th>Count In Stock</th>
								<th>PRICE</th>
								<th>WSPRICE</th>
								<th>WZPRICE</th>
								<th>SALEPRICE</th>
								<th>CUSTOMIZATIONS</th>
								<th>ACTIONS</th>
							</tr>
						</thead>

						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.itemNumber}</td>
									<td>{product.name}</td>
									<td>{product.quality}</td>
									<td>{product.category}</td>
									<td>{product.countInStock}</td>
									<td>${product.price}</td>
									<td>${product.wsPrice}</td>
									<td>${product.wzPrice}</td>
									<td>${product.salePrice}</td>
									<td>
										{product.customizations.length > 0 ? (
											<div>
												<span>
													{product.customizations
														.slice(0, 1)
														.map((item) =>
															item.size === 0
																? ' '
																: 'Sizes:  '
														)}
													{product.customizations
														.map((item) =>
															item.size !== 0
																? item.size +
																  ' '
																: ''
														)
														.filter(
															(
																value,
																index,
																self
															) =>
																self.indexOf(
																	value
																) === index
														)}
												</span>

												<br />

												<span>
													{product.customizations
														.slice(0, 1)
														.map((item) =>
															item.color === 0
																? ' '
																: 'Colors:  '
														)}
													{product.customizations
														.map((item) =>
															item.color !== 0
																? item.color +
																  ' '
																: ''
														)
														.filter(
															(
																value,
																index,
																self
															) =>
																self.indexOf(
																	value
																) === index
														)}
												</span>

												<br />

												<span>
													{product.customizations
														.slice(0, 1)
														.map((item) => (
															<span
																key={item._id}
															>
																{item.countInStock ===
																0
																	? ' '
																	: 'Count In Stock:  '}
															</span>
														))}
													{product.customizations.map(
														(item) =>
															item.countInStock !==
															0
																? item.countInStock +
																  ' '
																: ''
													)}
												</span>
											</div>
										) : (
											''
										)}
									</td>

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
											onClick={() =>
												deleteHandler(product)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className='row center pagination'>
						{[...Array(pages).keys()].map((x) => (
							<Link
								className={x + 1 === page ? 'active' : ''}
								key={x + 1}
								to={`/productlist/pageNumber/${x + 1}`}
							>
								{x + 1}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	)
}
