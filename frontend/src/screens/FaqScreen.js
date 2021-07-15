import React from 'react'
import Faq from '../components/Faq.js'

export default function FaqScreen() {
	const faqData = [
		{
			question: 'How long does the jewelry last?',
			answer: 'Generally 6 months to a year. With basic jewelry care, such avoiding getting your jewelry soaked in water such as when you shower, they will last for much longer.',
		},
		{
			question: 'Why is there a limit/minimum for card purchases?',
			answer: '1',
		},
		{
			question: 'Why do I have to pay for shipping?',
			answer: '2',
		},
		{
			question: 'What is the return policy?',
			answer: '3',
		},
		{
			question: 'Why is there a limit/minimum for card purchases?',
			answer: '4',
		},
		{
			question: 'Why is there a limit/minimum for card purchases?',
			answer: '5',
		},
		{
			question: 'Why is there a limit/minimum for card purchases?',
			answer: '6',
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
