import React, { useState } from 'react'

const Faq = (props) => {
	const { question, answer } = props
	const [isOpen, toggleOpen] = useState(false)

	return (
		<div className='faq' onClick={() => toggleOpen(!isOpen)}>
			<div className='faq-question'>
				<span>Q: {question}</span>
			</div>

			<div
				className='faq-answer'
				style={isOpen ? { display: 'block' } : { display: 'none' }}
			>
				<span>A: {answer}</span>
			</div>
		</div>
	)
}

export default Faq
