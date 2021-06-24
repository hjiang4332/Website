import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {
	//get user info from store
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin
	return (
		<Route
			{...rest}
			//redirect to signin screen when signing out at profile screen to prevent error
			render={(props) =>
				userInfo ? (
					<Component {...props}></Component>
				) : (
					<Redirect to='/signin' />
				)
			}
		/>
	)
}
