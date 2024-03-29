import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

export default function OrderListScreen(props) {
	//get orders to list them
	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	//get orderDelete from orderactions to delete
	const orderDelete = useSelector((state) => state.orderDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = orderDelete

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch({ type: ORDER_DELETE_RESET })
		dispatch(listOrders())
	}, [dispatch, successDelete])

	const deleteHandler = (order) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteOrder(order._id))
		}
	}

	return (
		<div>
			<h1>Orders</h1>

			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && (
				<MessageBox variant='danger'>{errorDelete}</MessageBox>
			)}

			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders
							.slice(0)
							.reverse()
							.map((order) => (
								<tr
									key={order._id}
									className={
										order.isPaid
											? order.isDelivered
												? 'greenbg'
												: 'redbg'
											: 'greybg'
									}
								>
									<td>{order._id}</td>
									<td>
										{order.user
											? order.user.name
											: 'Deleted User'}
									</td>
									<td>
										{order.user
											? order.createdAt.substring(0, 10)
											: 'No created date'}
									</td>
									<td>${order.totalPrice.toFixed(2)}</td>
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
											Details
										</button>
										<button
											type='button'
											className='small'
											onClick={() => deleteHandler(order)}
										>
											Delete
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
