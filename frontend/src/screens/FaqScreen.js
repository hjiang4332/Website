import React from 'react'
import Faq from '../components/Faq.js'

export default function FaqScreen() {
	const faqData = [
		{
			question: 'How long does the jewelry last?',
			answer: `Costume quality: few weeks to a month ${(
				<br />
			)} Gold Plated: 6 months to a year ${(
				<br />
			)} Gold Filled: about a year ${(
				<br />
			)} Stainless Steel: more than a year, even when you shower every day`,
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
			question: 'What is your return policy?',
			answer: '3',
		},
		{
			question: 'Can you get X for me?',
			answer: 'No guarantees, but feel free to leave a suggestion',
		},
		{
			question: 'I havent gotten my package yet, when is it coming?',
			answer: 'We will always do ground shipping as it is the cheapest, it takes about 1-3 days depending on holidays, and how close you live. Everything is based off of USPS, so please wait a bit more for your package to come.',
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
