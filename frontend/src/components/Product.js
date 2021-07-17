import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {
	const { product } = props

	return (
		<div key={product._id} className='card'>
			<Link to={`/product/${product._id}`}>
				<img
					className='medium'
					src={product.image}
					alt={product.name}
				/>
			</Link>

			<div className='card-body'>
				<Link to={`/product/${product._id}`}>
					<h2>
						{product.itemNumber}: {product.name}
					</h2>
				</Link>
				<div>Quality: {product.quality}</div>

                {product.customizations.length > 0 ? }
				{/*<div>
					{product.customizations.length > 0 ? (
						<span>
							Colors:{' '}
							{product.customizations
								.map((item) =>
									item.color ? item.color + ' ' : ''
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
							Sizes:{' '}
							{product.customizations
								.map((item) =>
									item.size ? item.size + ' ' : ''
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
                    */}

				<div className='price left'>Price: ${product.price}</div>
				<div className='price right'>Wholesale: ${product.wsPrice}</div>
			</div>
		</div>
	)
}
