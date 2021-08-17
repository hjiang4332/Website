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
	const [query, setQuery] = useState('available')

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
					<div>
						<form className='row center'>
							<div>
								<input
									type='radio'
									id='available'
									value='available'
									name='query'
									required
									checked
									onChange={(e) => setQuery(e.target.value)}
								/>
								<label htmlFor='ship'>Available items</label>
							</div>

							<div>
								<input
									type='radio'
									id='all'
									value='all'
									name='query'
									required
									onChange={(e) => setQuery(e.target.value)}
								/>
								<label htmlFor='pickup'>All items</label>
							</div>
						</form>
						{console.log(query)}
					</div>

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
