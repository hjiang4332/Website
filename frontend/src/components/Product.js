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

				{/* TODO
                    {product.customizations.map((item, i) =>
                        i.size ? 'nope' : i.size
                    )}
                    
                */}
				<div>
					Colors:{' '}
					{product.customizations &&
					product.customizations.length > 0 ? (
						<span>
							{product.customizations
								.map((item) => item.color + ' ')
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								)}
						</span>
					) : (
						'No extra colors'
					)}
				</div>
				<div>
					Sizes:{' '}
					{product.customizations &&
					product.customizations.length > 0 ? (
						<span>
							{product.customizations
								.map((item) => item.size + ' ')
								.filter(
									(value, index, self) =>
										self.indexOf(value) === index
								)}
						</span>
					) : (
						'No extra sizes'
					)}
				</div>
				<div className='price left'>Price: ${product.price}</div>
				<div className='price right'>Wholesale: ${product.wsPrice}</div>
			</div>
		</div>
	)
}
