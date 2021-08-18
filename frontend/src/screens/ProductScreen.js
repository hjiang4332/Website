import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useLocation } from 'react-router-dom'

import { Trans } from 'react-i18next'

export default function ProductScreen(props) {
	const dispatch = useDispatch()

	//get product details
	const productId = props.match.params.id
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	//get item customizations from product component in home screen
	const location = useLocation()
	const { customizations } = location.state || ['']

	//send person back to home if they middle clicked the product link
	if (typeof customizations === 'undefined') {
		props.history.push('/')
	}

	//radio buttons for customizations
	const [size, setSize] = useState(0)
	const [style, setStyle] = useState('0')
	const [countInStock, setCountInStock] = useState(0)
	const [qty, setQty] = useState(1)

	const sizeOptions = []
	const styleOptions = []

	const [hasCustomizations, setHasCustomizations] = useState(false)

	//selected image for carousel
	const [selectedImage, setSelectedImage] = useState('')
	//get initial values
	useEffect(() => {
		if (
			typeof customizations !== 'undefined' &&
			customizations.length > 0
		) {
			setHasCustomizations(true)
			setSize(Number(customizations.slice(0, 1).map((item) => item.size)))

			const initialStyle = customizations
				.slice(0, 1)
				.map((item) => item.style)
			setStyle(initialStyle[0])

			setCountInStock(
				Number(
					customizations.slice(0, 1).map((item) => item.countInStock)
				)
			)
		}
	}, [customizations])

	if (typeof customizations !== 'undefined') {
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

		//fill styleOptions
		customizations
			.map((p) => p.style)
			.filter((v, i, a) => a.indexOf(v) === i)
			.map((style) =>
				styleOptions.push({
					label: style,
					value: style,
				})
			)
	}

	//get count in stock based off of select values (size and style)
	useEffect(() => {
		if (typeof customizations !== 'undefined') {
			customizations
				.filter(
					(item) =>
						item.size === size &&
						item.style.toString() === style.toString()
				)
				.map((filteredItem) =>
					setCountInStock(filteredItem.countInStock)
				)
		}
	}, [customizations, size, style])

	//fill countInStock
	useEffect(() => {
		dispatch(detailsProduct(productId))
	}, [dispatch, productId])

	const addToCartHandler = () => {
		props.history.push(
			`/cart/${productId}?qty=${qty}&style=${style}&size=${size}`
		)
	}

	const changeImage = (image) => {
		setSelectedImage(image)
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
								src={selectedImage || product.image}
								alt={product.name}
							/>
						</div>

						<div className='col-1'>
							<ul>
								<li>
									<h1>{product.name}</h1>
								</li>

								<li>
									<Trans i18nKey='quality' /> :{' '}
									{product.quality}
								</li>

								{product.onSale ? (
									<li>
										<Trans i18nKey='quality' />: $
										{product.wsPrice}
									</li>
								) : (
									<li>
										<div className='row'>
											<span>
												<Trans i18nKey='retail' />:{' '}
											</span>
											<div className='price'>
												${product.price}
											</div>
											<span>
												<Trans i18nKey='wholesale' />:{' '}
											</span>
											<div className='price'>
												${product.wsPrice}
											</div>
										</div>
									</li>
								)}

								<li>
									{hasCustomizations ? (
										<span>
											{customizations
												.slice(0, 1)
												.map((item) => (
													<span key={item._id}>
														{item.style === '0' ? (
															<br />
														) : (
															'Style:  '
														)}
													</span>
												))}
											{customizations
												.map((item) =>
													item.style !== '0'
														? item.style + ' '
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

								<li>
									<Trans i18nKey='description' />:{' '}
									{product.description}
								</li>

								<li>
									Images:
									<ul className='images'>
										{[product.image, ...product.images].map(
											(x) => (
												<li key={x}>
													<button
														type='button'
														className='light'
														onClick={() =>
															changeImage(x)
														}
													>
														<img
															src={x}
															alt='product'
															className='small'
														/>
													</button>
												</li>
											)
										)}
									</ul>
								</li>
							</ul>
						</div>

						<div className='col-1'>
							<div className='card card-body'>
								<ul>
									{product.onSale ? (
										<li>
											<Trans i18nKey='onSale' />: $
											{product.wsPrice}
										</li>
									) : (
										<li>
											<div className='row'>
												<div>
													<Trans i18nKey='retail' />:{' '}
												</div>
												<div className='price'>
													${product.price}
												</div>
												<div>
													<Trans i18nKey='wholesale' />{' '}
													:
												</div>
												<div className='price'>
													${product.wsPrice}
												</div>
											</div>
										</li>
									)}

									{/* Display Select buttons*/}
									{hasCustomizations ? (
										<div>
											{size !== 0 && (
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
											)}

											{style !== '0' && (
												<select
													value={style}
													onChange={(e) =>
														setStyle(e.target.value)
													}
												>
													{styleOptions.map((x) => (
														<option
															key={x.value}
															value={x.value}
														>
															{x.label}
														</option>
													))}
												</select>
											)}

											<span>
												<Trans i18nKey='available' />{' '}
												{countInStock}
											</span>
										</div>
									) : (
										<br />
									)}
									<li>
										<div className='row'>
											<div>
												<Trans i18nKey='status' />
											</div>

											{/* If there are customizations, use countInStock from there. If not, use regular countInStock*/}
											{hasCustomizations ? (
												<div>
													{countInStock > 0 ? (
														<span className='success'>
															<Trans i18nKey='inStock' />
														</span>
													) : (
														<span className='danger'>
															<Trans i18nKey='unavailable' />
														</span>
													)}
												</div>
											) : (
												<div>
													{product.countInStock >
													0 ? (
														<span className='success'>
															<Trans i18nKey='inStock' />
														</span>
													) : (
														<span className='danger'>
															<Trans i18nKey='unavailable' />
														</span>
													)}
												</div>
											)}
										</div>
									</li>
									<>
										<li>
											<div className='row'>
												<div>
													<Trans i18nKey='available' />
													:{' '}
													<span>
														{hasCustomizations
															? countInStock
															: product.countInStock}
													</span>{' '}
												</div>
											</div>
											<div className='row'>
												<div>
													<Trans i18nKey='quantity' />
												</div>
												<div>
													<select
														value={qty}
														onChange={(e) =>
															setQty(
																e.target.value
															)
														}
													>
														{[
															...Array(
																hasCustomizations
																	? countInStock
																	: product.countInStock
															).keys(),
														].map((x) => (
															<option
																key={x + 1}
																value={x + 1}
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
												disabled={
													hasCustomizations
														? countInStock === 0
														: product.countInStock ===
														  0
												}
											>
												<Trans i18nKey='addToCart' />
											</button>
										</li>
									</>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
