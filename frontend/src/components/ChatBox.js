import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const ENDPOINT =
	window.location.host.indexOf('localhost') >= 0
		? 'http://127.0.0.1:5000'
		: window.location.host

export default function ChatBox(props) {
	const { userInfo } = props
	const [socket, setSocket] = useState(null)
	const uiMessagesRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	const [messageBody, setMessageBody] = useState('')
	const [messages, setMessages] = useState([
		{ name: 'Admin', body: 'Hi, how may I help you?' },
	])

	useEffect(() => {
		//scroll down
		if (uiMessagesRef.current) {
			uiMessagesRef.current.scrollBy({
				top: uiMessagesRef.current.clientHeight,
				left: 0,
				behavior: 'smooth',
			})
		}

		//if socket login, add new messages
		if (socket) {
			socket.emit('onLogin', {
				_id: userInfo._id,
				name: userInfo.name,
				isAdmin: userInfo.isAdmin,
			})
			socket.on('message', (data) => {
				setMessages([...messages, { body: data.body, name: data.name }])
			})
		}
	}, [
		messages,
		isOpen,
		socket,
		userInfo._id,
		userInfo.name,
		userInfo.isAdmin,
	])

	//click icon handler
	const supportHandler = () => {
		setIsOpen(true)
		console.log(ENDPOINT)
		const sk = socketIOClient(ENDPOINT)
		setSocket(sk)
	}

	//click submit button handler
	const submitHandler = (e) => {
		e.preventDefault()

		//make sure they type something, if they do then update messages array, clear message, send info.
		if (!messageBody.trim()) {
			alert('Please type a real message')
		} else {
			setMessages([
				...messages,
				{ body: messageBody, name: userInfo.name },
			])
			setMessageBody('')
			setTimeout(() => {
				socket.emit('onMessage', {
					body: messageBody,
					name: userInfo.name,
					isAdmin: userInfo.isAdmin,
					_id: userInfo._id,
				})
			}, 1000)
		}
	}

	//close support handler
	const closeHandler = () => {
		setIsOpen(false)
	}

	return (
		<div className='chatbox'>
			{!isOpen ? (
				<button type='button' onClick={supportHandler}>
					<i className='fa fa-question-circle' aria-hidden='true'></i>
				</button>
			) : (
				<div className='card card-body'>
					<div className='row'>
						<strong>Support </strong>

						<button type='button' onClick={closeHandler}>
							<i className='fa fa-close' />
						</button>
					</div>

					<ul ref={uiMessagesRef}>
						{messages.map((msg, index) => (
							<li key={index}>
								<strong>{`${msg.name}: `}</strong> {msg.body}
							</li>
						))}
					</ul>

					<div>
						<form onSubmit={submitHandler} className='row'>
							<input
								value={messageBody}
								onChange={(e) => setMessageBody(e.target.value)}
								type='text'
								placeholder='type message'
							/>
							<button type='submit'>Send</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
