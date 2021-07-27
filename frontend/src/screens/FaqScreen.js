import React from 'react'
import Faq from '../components/Faq.js'

export default function FaqScreen() {
	const faqData = [
		{
			question: 'How long does the jewelry last?',
			answer: `Costume quality: few weeks to a month Gold Plated: 6 months to a year Gold Filled: about a year Stainless Steel: more than a year, even when you shower every day`,
		},
		{
			question: 'Can allergic people wear X?',
			answer: 'Usually stainless steel is the safest option if you are allergic to certain metals because its hypoallergenic. Gold filled tends to be similar unless youre very allergic. Gold plated and Fashion jewelry are more dangerous options and should be avoided. ',
		},
		{
			question:
				'Why is there a limit/minimum for card purchases, why do I always have to pay for shipping?',
			answer: 'Our business model is to sell low but sell a lot. Card fee and shipping is too much for me to afford. Most people, however, save more time and money from ordering anyways, since driving and or transit will cost a fair amount.',
		},
		{
			question: 'What is your return policy?',
			answer: 'Email an inquiry to classyjewelryws@gmail.com with the subject being "return inquiry for order #x" and pictures of the items. Any inquiries made after 1 month will not be considered.',
		},
		{
			question: 'Can you get X for me?',
			answer: 'No guarantees, but feel free to leave a suggestion and if I believe they will sell / I can get it, I will.',
		},
		{
			question: 'I havent gotten my package yet, when is it coming?',
			answer: 'We will always do ground shipping as it is the cheapest, it takes about 1-3 days depending on holidays, and how close you live. Everything is based off of USPS, so please wait a bit more for your package to come.',
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
