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
	const [category, setCategory] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState('')
	const [wsPrice, setWsPrice] = useState('')
	const [wzPrice, setWzPrice] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [description, setDescription] = useState('')

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
			//set fields with data from products
			setName(product.name)
			setCategory(product.category)
			setImage(product.image)
			setPrice(product.price)
			setWsPrice(product.wsPrice)
			setWzPrice(product.wzPrice)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
	}, [product, dispatch, productId, successUpdate, props.history])

	const submitHandler = (e) => {
		e.preventDefault()
		// TODO: dispatch update product
		dispatch(
			//product actions
			updateProduct({
				_id: productId,
				name,
				category,
				image,
				price,
				wsPrice,
				wzPrice,
				countInStock,
				description,
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