import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useLocation } from 'react-router-dom'

export default function ProductScreen(props) {
	const dispatch = useDispatch()

	//get product details
	const productId = props.match.params.id
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	//get item customizations from product component in home screen
	const location = useLocation()
	const { customizations } = location.state
	//TODO FIX LOCATION.STATE UNDEFINED WHEN CLICKING LINK FROM CART SCREEN

	//radio buttons for customizations
	const [size, setSize] = useState('')
	const [color, setColor] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [qty, setQty] = useState(1)

	const sizeOptions = []
	const colorOptions = []

	const [hasCustomizations, setHasCustomizations] = useState(false)

	useEffect(() => {
		setSize(Number(customizations.slice(0, 1).map((item) => item.size)))

		const initialColor = customizations
			.slice(0, 1)
			.map((item) => item.color)
		setColor(initialColor[0])

		setCountInStock(
			Number(customizations.slice(0, 1).map((item) => item.countInStock))
		)
		if (customizations.length > 0) {
			setHasCustomizations(true)
		}
	}, [customizations])

	useEffect(() => {
		customizations
			.filter(
				(item) =>
					item.size.toString() === size.toString() &&
					item.color.toString() === color.toString()
			)
			.map((filteredItem) => setCountInStock(filteredItem.countInStock))
	}, [customizations, size, color])

	//fill sizeOptions
	customizations
		.map((item) => item.size)
		.filter((v, i, a) => a.indexOf(v) === i)
		.map((size) =>
			sizeOptions.push({
				label: size,
				value: size,
			})
		)

	//fill colorOptions
	customizations
		.map((p) => p.color)
		.filter((v, i, a) => a.indexOf(v) === i)
		.map((color) =>
			colorOptions.push({
				label: color,
				value: color,
			})
		)

	//fill countInStock
	useEffect(() => {
		dispatch(detailsProduct(productId))
	}, [dispatch, productId])

	const addToCartHandler = () => {
		props.history.push(
			`/cart/${productId}?qty=${qty}&color=${color}&size=${size}`
		)
	}

	return (
		<div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<div>
					<div className='row top'>
						<div className='col-2'>
							<img
								className='large'
								src={product.image}
								alt={product.name}
							/>
						</div>

						<div className='col-1'>
							<ul>
								<li>
									<h1>{product.name}</h1>
								</li>

								<li>Quality : {product.quality}</li>

								<li>Price : ${product.price}</li>
								<li>Wholesale Price : ${product.wsPrice}</li>

								<li>
									{hasCustomizations ? (
										<span>
											{customizations
												.slice(0, 1)
												.map((item) => (
													<span key={item._id}>
														{item.color === '0' ? (
															<br />
														) : (
															'Colors:  '
														)}
													</span>
												))}
											{customizations
												.map((item) =>
													item.color !== '0'
														? item.color + ' '
														: ''
												)
												.filter(
													(value, index, self) =>
														self.indexOf(value) ===
														index
												)}
										</span>
									) : (
										<br />
									)}
								</li>

								{console.log(size)}
								<li>
									{hasCustomizations ? (
										<span>
											{customizations
												.slice(0, 1)
												.map((item) => (
													<span key={item._id}>
														{item.size === 0 ? (
															<br />
														) : (
															'Sizes:  '
														)}
													</span>
												))}
											{customizations
												.map((item) =>
													item.size !== 0
														? item.size + ' '
														: ''
												)
												.filter(
													(value, index, self) =>
														self.indexOf(value) ===
														index
												)}
										</span>
									) : (
										<br />
									)}
								</li>

								<li>Description: {product.description}</li>
							</ul>
						</div>

						<div className='col-1'>
							<div className='card card-body'>
								<ul>
									<li>
										<div className='row'>
											<div>Price</div>
											<div className='price'>
												${product.price}
											</div>
										</div>
									</li>

									<li>
										<div className='row'>
											<div>Wholesale Price</div>
											<div className='price'>
												${product.wsPrice}
											</div>
										</div>
									</li>

									{/* Display Select buttons*/}
									{hasCustomizations ? (
										<div>
											<select
												value={size}
												onChange={(e) =>
													setSize(e.target.value)
												}
											>
												{sizeOptions.map((x) => (
													<option
														key={x.value}
														value={x.value}
													>
														{x.label}
													</option>
												))}
											</select>

											<select
												value={color}
												onChange={(e) =>
													setColor(e.target.value)
												}
											>
												{colorOptions.map((x) => (
													<option
														key={x.value}
														value={x.value}
													>
														{x.label}
													</option>
												))}
											</select>

											<span>
												{'Available: ' + countInStock}
											</span>
										</div>
									) : (
										<br />
									)}

									<li>
										<div className='row'>
											<div>Status</div>

											{/* If there are customizations, use countInStock from there. If not, use regular countInStock*/}
											{hasCustomizations ? (
												<div>
													{countInStock > 0 ? (
														<span className='success'>
															In Stock
														</span>
													) : (
														<span className='danger'>
															Unavailable
														</span>
													)}
												</div>
											) : (
												<div>
													{product.countInStock >
													0 ? (
														<span className='success'>
															In Stock
														</span>
													) : (
														<span className='danger'>
															Unavailable
														</span>
													)}
												</div>
											)}
										</div>
									</li>

									{hasCustomizations ? (
										<>
											<li>
												<div className='row'>
													<div>Quantity</div>
													<div>
														<select
															value={qty}
															onChange={(e) =>
																setQty(
																	e.target
																		.value
																)
															}
														>
															{[
																...Array(
																	countInStock
																).keys(),
															].map((x) => (
																<option
																	key={x + 1}
																	value={
																		x + 1
																	}
																>
																	{x + 1}
																</option>
															))}
														</select>
													</div>
												</div>
											</li>

											<li>
												<button
													onClick={addToCartHandler}
													className='primary block'
												>
													Add to Cart
												</button>
											</li>
										</>
									) : (
										product.countInStock > 0 && (
											<>
												<li>
													<div className='row'>
														<div>Quantity</div>
														<div>
															<select
																value={qty}
																onChange={(e) =>
																	setQty(
																		e.target
																			.value
																	)
																}
															>
																{[
																	...Array(
																		product.countInStock
																	).keys(),
																].map((x) => (
																	<option
																		key={
																			x +
																			1
																		}
																		value={
																			x +
																			1
																		}
																	>
																		{x + 1}
																	</option>
																))}
															</select>
														</div>
													</div>
												</li>

												<li>
													<button
														onClick={
															addToCartHandler
														}
														className='primary block'
													>
														Add to Cart
													</button>
												</li>
											</>
										)
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
