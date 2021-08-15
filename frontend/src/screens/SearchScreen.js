import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'
import { prices } from '../utils'

import { Trans } from 'react-i18next'

export default function SearchScreen(props) {
	//use all if theres no name
	const {
		name = 'all',
		category = 'all',
		quality = 'all',
		min = 0,
		max = 0,
		order = 'newest',
		pageNumber = 1,
	} = useParams()

	//get product list from redux to sort
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	//see if theres a category selected
	const productCategoryList = useSelector(
		(state) => state.productCategoryList
	)
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList

	//see if theres a quality selected
	const productQualityList = useSelector((state) => state.productQualityList)
	const {
		loading: loadingQualities,
		error: errorQualities,
		qualities,
	} = productQualityList

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(
			listProducts({
				pageNumber,
				name: name !== 'all' ? name : '',
				category: category !== 'all' ? category : '',
				quality: quality !== 'all' ? quality : '',
				min,
				max,
				order,
			})
		)
	}, [category, quality, dispatch, max, min, name, order, pageNumber])

	//filter for correct link with category
	const getFilterUrl = (filter) => {
		const filterPage = filter.page || pageNumber
		const filterCategory = filter.category || category
		const filterQuality = filter.quality || quality
		const filterName = filter.name || name
		const sortOrder = filter.order || order
		const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
		const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max
		return `/search/category/${filterCategory}/quality/${filterQuality}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`
	}

	return (
		<div>
			<div className='row'>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<div>
						{products.length} Results for
						{category !== 'all' && ` : ${category}`}
						{name !== 'all' && ` : ${name}`}
						{min !== 0 && ` : $${min} to $${max}`}
						{category !== 'all' || name !== 'all' || min ? (
							<>
								&nbsp;
								<button
									type='button'
									className='small'
									onClick={() => props.history.push('/')}
								>
									Go To Home
								</button>
							</>
						) : null}
					</div>
				)}

				<div>
					<Trans i18nKey='sortBy' />{' '}
					<select
						value={order}
						onChange={(e) => {
							props.history.push(
								getFilterUrl({ order: e.target.value })
							)
						}}
					>
						<option value='newest'>Newest Arrivals</option>
						<option value='lowest'>Price: Low to High</option>
						<option value='highest'>Price: High to Low</option>
					</select>
				</div>
			</div>

			<div className='row top'>
				<div className='col-1'>
					<h3>
						<Trans i18nKey='category' />
					</h3>
					<div>
						{loadingCategories ? (
							<LoadingBox></LoadingBox>
						) : errorCategories ? (
							<MessageBox variant='danger'>
								{errorCategories}
							</MessageBox>
						) : (
							<ul>
								<li>
									<Link
										className={
											'all' === category ? 'active' : ''
										}
										to={getFilterUrl({ category: 'all' })}
									>
										<Trans i18nKey='any' />
									</Link>
								</li>
								{categories.map((c) => (
									<li key={c}>
										<Link
											className={
												c === category ? 'active' : ''
											}
											to={getFilterUrl({ category: c })}
										>
											{c}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>

					<h3>
						<Trans i18nKey='quality' />:
					</h3>
					<div>
						{loadingQualities ? (
							<LoadingBox></LoadingBox>
						) : errorQualities ? (
							<MessageBox variant='danger'>
								{errorQualities}
							</MessageBox>
						) : (
							<ul>
								<li>
									<Link
										className={
											'all' === quality ? 'active' : ''
										}
										to={getFilterUrl({ quality: 'all' })}
									>
										<Trans i18nKey='any' />
									</Link>
								</li>
								{qualities.map((q) => (
									<li key={q}>
										<Link
											className={
												q === quality ? 'active' : ''
											}
											to={getFilterUrl({ quality: q })}
										>
											{q}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>

					<div>
						<h3>
							<Trans i18nKey='price' />
						</h3>
						<ul>
							{prices.map((p) => (
								<li key={p.name}>
									<Link
										to={getFilterUrl({
											min: p.min,
											max: p.max,
										})}
										className={
											`${p.min}-${p.max}` ===
											`${min}-${max}`
												? 'active'
												: ''
										}
									>
										{p.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='col-3'>
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							{products.length === 0 && (
								<MessageBox>No Product Found</MessageBox>
							)}

							<div className='row center'>
								{products.map((product) => (
									<Product
										key={product._id}
										product={product}
									></Product>
								))}
							</div>

							<div className='row center pagination'>
								{[...Array(pages).keys()].map((x) => (
									<Link
										className={
											x + 1 === page ? 'active' : ''
										}
										key={x + 1}
										to={getFilterUrl({ page: x + 1 })}
									>
										{x + 1}
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
