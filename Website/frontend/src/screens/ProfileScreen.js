import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

export default function ProfileScreen() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	//get user info for the id to pass into useEffect
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	//get user details from store.js
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	//get update profile info from store
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const {
		success: successUpdate,
		error: errorUpdate,
		loading: loadingUpdate,
	} = userUpdateProfile

	const dispatch = useDispatch()
	useEffect(() => {
		if (!user) {
			//reset success update when you reopen profile again
			dispatch({ type: USER_UPDATE_PROFILE_RESET })
			dispatch(getUserDetails(userInfo._id))
		} else {
			setName(user.name)
			setEmail(user.email)
		}
	}, [dispatch, userInfo._id, user])

	const submitHandler = (e) => {
		e.preventDefault()
		//update profile
		if (password !== confirmPassword) {
			alert('Password and Confirm Password do not match')
		} else {
			dispatch(
				updateUserProfile({ userId: user._id, name, email, password })
			)
		}
	}

	return (
		<div>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>User Profile</h1>
				</div>

				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<>
						{loadingUpdate && <LoadingBox></LoadingBox>}
						{errorUpdate && (
							<MessageBox variant='danger'>
								{errorUpdate}
							</MessageBox>
						)}
						{successUpdate && (
							<MessageBox variant='success'>
								Profile Updated Successfully
							</MessageBox>
						)}
						<div>
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								placeholder='Enter password'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='confirmPassword'>
								confirm Password
							</label>
							<input
								id='confirmPassword'
								type='password'
								placeholder='Enter confirm password'
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
						</div>
						<div>
							<label />
							<button className='primary' type='submit'>
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	)
}
