import React, { useEffect, useState } from 'react'

import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'

export default function HomeScreen() {
	const { pageNumber = 1 } = useParams()

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	//choosing which products to load
	//const [query, setQuery] = useState('available')

	//get user info from redux to use to change date
	/*const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin
	const [nextShipmentDate, setNextShipmentDate] = useState('')*/

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listProducts({ pageNumber }))
	}, [dispatch, pageNumber])

	return (
		<div>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<>
					{/*
                    <div className='center'>
						<div>Next shipment: {nextShipmentDate}</div>
						{userInfo && userInfo.isAdmin && (
							<form>
								<label>
									Date:
									<input
										type='text'
										value={nextShipmentDate}
										onChange={(e) =>
											setNextShipmentDate(e.target.value)
										}
									/>
								</label>
								<input type='submit' value='Submit' />
							</form>
						)}
					</div>
                    */}

					<div className='row center'>
						{products.map(
							(product) =>
								product.countInStock !== 0 && (
									<Product
										key={product._id}
										product={product}
									/>
								)
						)}
					</div>

					<div className='row center pagination'>
						{[...Array(pages).keys()].map((x) => (
							<Link
								className={x + 1 === page ? 'active' : ''}
								key={x + 1}
								to={`/pageNumber/${x + 1}`}
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
