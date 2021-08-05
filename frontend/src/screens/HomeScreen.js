import React, { useEffect } from 'react'

import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'

export default function HomeScreen() {
	const { pageNumber = 1 } = useParams()

	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

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
					<div className='row center'>
						{products.map(
							(product) => (
								//typeof product.salePrice === 'undefined' && (
								<Product key={product._id} product={product} />
							)
							//)
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
