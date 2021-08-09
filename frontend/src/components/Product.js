import React from 'react'
import { Link } from 'react-router-dom'

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
				<div>Quality: {product.quality}</div>

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

				{!product.onSale ? (
					<span>
						<div className='price left'>
							Price: ${product.price}
						</div>
						<div className='price right'>
							Wholesale: ${product.wsPrice}
						</div>
					</span>
				) : (
					<div className='price left'>
						On Sale: ${product.wsPrice}
					</div>
				)}
			</div>
		</div>
	)
}
