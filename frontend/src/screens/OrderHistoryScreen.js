import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { Trans } from 'react-i18next'

export default function OrderHistoryScreen(props) {
	const orderHistoryList = useSelector((state) => state.orderHistoryList)
	const { loading, error, orders } = orderHistoryList

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listMyOrder())
	}, [dispatch])

	return (
		<div>
			<h1>Order History</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>
								<Trans i18nKey='id' />
							</th>
							<th>
								<Trans i18nKey='date' />
							</th>
							<th>
								<Trans i18nKey='total' />
							</th>
							<th>
								<Trans i18nKey='paid' />
							</th>
							<th>
								<Trans i18nKey='deliveredDate' />
							</th>
							<th>
								<Trans i18nKey='actions' />
							</th>
						</tr>
					</thead>
					<tbody>
						{orders
							.slice(0)
							.reverse()
							.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice.toFixed(2)}</td>
									<td>
										{order.isPaid
											? order.paidAt.substring(0, 10)
											: 'No'}
									</td>
									<td>
										{order.isDelivered
											? order.deliveredAt.substring(0, 10)
											: 'No'}
									</td>
									<td>
										<button
											type='button'
											className='small'
											onClick={() => {
												props.history.push(
													`/order/${order._id}`
												)
											}}
										>
											<Trans i18nKey='orderDetails' />
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	)
}
