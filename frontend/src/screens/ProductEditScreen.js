import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

export default function ProductEditScreen(props) {
	const productId = props.match.params.id

	const [name, setName] = useState('')
	const [quality, setQuality] = useState('')
	const [category, setCategory] = useState('')
	const [image, setImage] = useState('')
	const [images, setImages] = useState([])
	const [price, setPrice] = useState('')
	const [wsPrice, setWsPrice] = useState('')
	const [costPrice, setCostPrice] = useState('')
	const [onSale, setOnSale] = useState(false)
	const [countInStock, setCountInStock] = useState('')
	const [description, setDescription] = useState('')

	let customizations = []
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
			setName(product.name)
			setQuality(product.quality)
			setCategory(product.category)
			setImage(product.image)
			setImages(product.images)
			setPrice(product.price)
			setWsPrice(product.wsPrice)
			setCostPrice(product.CostPrice)
			setOnSale(product.onSale)
			setCountInStock(product.countInStock)
			setDescription(product.description)
			setCustomizationsString(
				product.customizations.length > 0
					? product.customizations
							.map(
								(item) =>
									item.color +
									' ' +
									item.size +
									' ' +
									item.countInStock
							)
							.toString()
					: ''
			)
		}
	}, [product, dispatch, productId, successUpdate, props.history])

	const submitHandler = (e) => {
		e.preventDefault()

		if (customizationsString.length > 0) {
			for (
				let item = 0;
				item < customizationsString.split(',').length;
				item++
			) {
				let singleCustomization = customizationsString.split(',')[item]
				let color = singleCustomization.split(' ')[0]
				let size = singleCustomization.split(' ')[1]
				let countInStock = singleCustomization.split(' ')[2]

				let custom = { color, size, countInStock }
				customizations.push(custom)
			}
		}

		dispatch(
			updateProduct({
				_id: productId,
				name,
				quality,
				category,
				image,
				images,
				price,
				wsPrice,
				costPrice,
				onSale,
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

	const uploadFileHandler = async (e, forImages) => {
		const file = e.target.files[0]
		const bodyFormData = new FormData()
		bodyFormData.append('image', file)
		setLoadingUpload(true)
		try {
			const { data } = await axios.post('/api/uploads/s3', bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			if (forImages) {
				setImages([...images, data])
			} else {
				setImage(data)
			}
			setLoadingUpload(false)
		} catch (error) {
			setErrorUpload(error.message)
			setLoadingUpload(false)
		}
	}

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
							<label htmlFor='quality'>
								Quality: Gold Filled, Stainless Steel, Fashion,
								Not applicable
							</label>
							<input
								id='quality'
								type='text'
								placeholder='Enter quality'
								value={quality}
								onChange={(e) => setQuality(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='category'>
								Category(Anklet, Bracelet, Dz, Earring,
								Necklace, Ring, Set, etc)
							</label>
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
							<label htmlFor='image-file'>
								Additional Images
							</label>
							<div>
								<ul>
									{images.length === 0 && <li>No image</li>}
									{images.map((x) => (
										<li>{x}</li>
									))}
								</ul>
								<input
									type='file'
									id='additional-image-file'
									label='Choose Image'
									onChange={(e) => uploadFileHandler(e, true)}
								/>
							</div>
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
							<label htmlFor='onSale'>On Sale</label>
							<input
								id='onSale'
								type='checkbox'
								checked={onSale}
								onChange={(e) => setOnSale(e.target.checked)}
							></input>
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
							<label htmlFor='costPrice'>Wz Price</label>
							<input
								id='costPrice'
								type='text'
								placeholder='Enter Wz price'
								value={costPrice}
								onChange={(e) => setCostPrice(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='customizationsString'>
								CustomizationsString: style size countInStock,
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
