import React from 'react'
import Faq from '../components/Faq.js'

export default function FaqScreen() {
	const faqData = [
		{
			question: 'What does FAQ stand for?',
			answer: 'Frequently Asked Question',
		},
		{
			question: 'What is the best ice cream flavor?',
			answer: 'Coffee with fudge ripple, or homemade strawberry.',
		},
	]

	return (
		<div>
			{faqData.map((faq, i) => (
				<Faq
					key={'faq_' + i}
					question={faq.question}
					answer={faq.answer}
				/>
			))}
		</div>
	)
}
