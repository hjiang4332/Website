import React from 'react'
import { Link } from 'react-router-dom'

import { Trans } from 'react-i18next'

export default function Product(props) {
	const { product } = props

	return (
		<div key={product._id} className='card'>
			<Link
				to={{
					pathname: `/product/${product._id}`,
					state: { customizations: product.customizations },
				}}
			>
				<img
					className='medium'
					src={product.image}
					alt={product.name}
				/>
			</Link>

			<div className='card-body'>
				<Link
					to={{
						pathname: `/product/${product._id}`,
						state: { customizations: product.customizations },
					}}
				>
					<h2>{product.name}</h2>
				</Link>
				<div>
					<Trans i18nKey='quality' />:{' '}
					<Trans i18nKey={product.quality} />
				</div>
				<div>
					{product.customizations.length > 0 ? (
						<span>
							{product.customizations.slice(0, 1).map((item) => (
								<span key={item._id}>
									{item.color === '0' ? <br /> : 'Colors:  '}
								</span>
							))}
							{product.customizations
								.map((item) =>
									item.color !== '0' ? item.color + ' ' : ''
								)
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								).length > 5
								? 'A lot'
								: product.customizations
										.map((item) =>
											item.color !== '0'
												? item.color + ' '
												: ''
										)
										.filter(
											(value, index, self) =>
												self.indexOf(value) === index
										)}
						</span>
					) : (
						<br />
					)}
				</div>
				<div>
					{product.customizations.length > 0 ? (
						<span>
							{product.customizations.slice(0, 1).map((item) => (
								<span key={item._id}>
									{item.size === 0 ? <br /> : 'Sizes:  '}
								</span>
							))}
							{product.customizations
								.map((item) =>
									item.size !== 0 ? item.size + ' ' : ''
								)
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								)}
						</span>
					) : (
						<br />
					)}
				</div>

				<span>
					<div className='price'>
						{product.onSale ? (
							<Trans i18nKey='onSale' />
						) : (
							<Trans i18nKey='wholesale' />
						)}
						: ${product.wsPrice} ea.
					</div>
				</span>
			</div>
		</div>
	)
}
