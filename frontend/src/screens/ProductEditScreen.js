import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

export default function ProductEditScreen(props) {
	const productId = props.match.params.id

	const [itemNumber, setItemNumber] = useState('')
	const [name, setName] = useState('')
	const [quality, setQuality] = useState('')
	const [category, setCategory] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState('')
	const [wsPrice, setWsPrice] = useState('')
	const [wzPrice, setWzPrice] = useState('')
	const [salePrice, setSalePrice] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [description, setDescription] = useState('')

	let customizations = [
		{ size: 5, color: 'silver', countInStock: 1000 },
		{ size: 6, color: 'gold', countInStock: 2000 },
	]
	const [customizationsString, setCustomizationsString] = useState('')

	//product for use effect
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	//update product details after clicking update button
	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	const dispatch = useDispatch()
	useEffect(() => {
		if (successUpdate) {
			props.history.push('/productlist')
		}

		if (!product || product._id !== productId || successUpdate) {
			//load from backend
			dispatch({ type: PRODUCT_UPDATE_RESET })
			dispatch(detailsProduct(productId))
		} else {
			//set fields with loaded data from products
			setItemNumber(product.itemNumber)
			setName(product.name)
			setQuality(product.quality)
			setCategory(product.category)
			setImage(product.image)
			setPrice(product.price)
			setWsPrice(product.wsPrice)
			setWzPrice(product.wzPrice)
			setSalePrice(product.SalePrice)
			setCountInStock(product.countInStock)
			setDescription(product.description)
			setCustomizationsString(
				product.customizations.length > 0
					? product.customizations.map(
							(item) =>
								item.color +
								' ' +
								item.size +
								' ' +
								item.countInStock
					  )
					: ''
			)
			/*setCustomizationsString(
				product.customizations.length > 0
					? product.customizations.map((item) => (
							<span key={item}>
								{item.color}
								{item.size}
								{item.countInStock}
							</span>
					  ))
					: ''
			)*/
		}
	}, [product, dispatch, productId, successUpdate, props.history])

	//console.log(customizationsString)

	const submitHandler = (e) => {
		e.preventDefault()

		//convert CustomizationsString to an array and put it into customizations, then send to be updated
		parseCustomizations(customizationsString)

		dispatch(
			updateProduct({
				_id: productId,
				itemNumber,
				name,
				quality,
				category,
				image,
				price,
				wsPrice,
				wzPrice,
				salePrice,
				countInStock,
				description,
				customizations,
			})
		)
	}

	const [loadingUpload, setLoadingUpload] = useState(false)
	const [errorUpload, setErrorUpload] = useState('')

	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const bodyFormData = new FormData()
		bodyFormData.append('image', file)
		setLoadingUpload(true)
		try {
			const { data } = await axios.post('/api/uploads', bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			setImage(data)
			setLoadingUpload(false)
		} catch (error) {
			setErrorUpload(error.message)
			setLoadingUpload(false)
		}
	}

	function parseCustomizations(props) {}

	return (
		<div>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>Edit Product: {productId}</h1>
				</div>

				{loadingUpdate && <LoadingBox></LoadingBox>}
				{errorUpdate && (
					<MessageBox variant='danger'>{errorUpdate}</MessageBox>
				)}

				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<>
						<div>
							<label htmlFor='itemNumber'>Item Number</label>
							<input
								id='itemNumber'
								type='text'
								placeholder='Enter item number'
								value={itemNumber}
								onChange={(e) => setItemNumber(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='quality'>Quality</label>
							<input
								id='quality'
								type='text'
								placeholder='Enter quality'
								value={quality}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='category'>Category</label>
							<input
								id='category'
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='countInStock'>Count In Stock</label>
							<input
								id='countInStock'
								type='text'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(e) =>
									setCountInStock(e.target.value)
								}
							/>
						</div>

						<div>
							<label htmlFor='image'>Image</label>
							<input
								id='image'
								type='text'
								placeholder='Enter image'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='imageFile'>Image File</label>
							<input
								type='file'
								id='imageFile'
								label='Choose Image'
								onChange={uploadFileHandler}
							></input>
							{loadingUpload && <LoadingBox></LoadingBox>}
							{errorUpload && (
								<MessageBox variant='danger'>
									{errorUpload}
								</MessageBox>
							)}
						</div>

						<div>
							<label htmlFor='price'>Price</label>
							<input
								id='price'
								type='text'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='wsPrice'>WS Price</label>
							<input
								id='wsPrice'
								type='text'
								placeholder='Enter Ws price'
								value={wsPrice}
								onChange={(e) => setWsPrice(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='wzPrice'>WZ Price</label>
							<input
								id='wzPrice'
								type='text'
								placeholder='Enter Wz price'
								value={wzPrice}
								onChange={(e) => setWzPrice(e.target.value)}
							/>
						</div>

						{/*<div>
							<label htmlFor='salePrice'>Sale Price</label>
							<input
								id='salePrice'
								type='text'
								placeholder='Enter Sale price'
								value={salePrice}
								onChange={(e) => setSalePrice(e.target.value)}
							/>
						</div>*/}

						<div>
							<label htmlFor='customizationsString'>
								CustomizationsString
							</label>
							<input
								id='customizationsString'
								type='text'
								placeholder='Enter customization: color, size, countInStock'
								value={customizationsString}
								onChange={(e) => {
									setCustomizationsString(e.target.value)
								}}
							/>
						</div>

						<div>
							<label htmlFor='description'>Description</label>
							<textarea
								id='description'
								rows='3'
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>

						<div>
							<label></label>
							<button className='primary' type='submit'>
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	)
}
