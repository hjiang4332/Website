import React, { useState } from 'react'

export default function SearchBox(props) {
	//what users enter into the searchbox
	const [name, setName] = useState('')

	const submitHandler = (e) => {
		e.preventDefault() //don't refresh page
		props.history.push(`/search/name/${name}`)
	}

	return (
		<form className='search' onSubmit={submitHandler}>
			<div className='row'>
				<input
					type='text'
					name='query'
					id='query'
					onChange={(e) => setName(e.target.value)}
				/>

				<button className='primary' type='submit'>
					<i className='fa fa-search'></i>
				</button>
			</div>
		</form>
	)
}
