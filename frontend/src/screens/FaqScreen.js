import React from 'react'
import Faq from '../components/Faq.js'

export default function FaqScreen() {
	const faqData = [
		{
			question: 'Errors / invalid tokens',
			answer: 'For any errors, please email classyjewelryws@gmail.com with a image of the error. Fix: try to refreshing the page. For token errors, log off and log in back to your account',
		},
		{
			question: 'Picking up an order',
			answer: 'Please message text us the day before you come so we can bring the package from the warehouse to our store. For a smoother experience, please have the order email opened up and tell us your name and order number so we can give you your package. Please come to the store within 1 month of the order, orders after a month will be shipped, shipping fees apply.',
		},
		{
			question: 'How long does the jewelry last?',
			answer: 'Costume quality: few weeks to a month Gold Plated: 6 months to a year Gold Filled: about a year Stainless Steel in silver: forever. These metrics were adjusted based off of casual wear with showering. We advise to have minimal jewelry care to maintain the color of the jewelry. Please attempt not to wash your dishes with rings on, please do not go into the water at the beach with jewelry on, as well as please do not leave your items in water or do other actions that could ruin the color of jewelry.',
		},
		{
			question: 'Why dont I get online prices in store?',
			answer: 'If you dont buy 12 of an item or $100 wholesale you will be charged retail prices. Online you are forced to buy the amount, but in store you can buy 1 item though they will be charged at retail price.',
		},

		{
			question: 'Why is there a limit/minimum for card purchases?',
			answer: 'We are charged for taking card. We can lose upwards of 50% of our profits just by taking card for some items.',
		},
		{
			question: 'Can you get X for me?',
			answer: 'No guarantees, but feel free to leave a suggestion through instagram or email a picture at classyjewelryws@gmail.com. We will respond with our answer through that medium.',
		},
		{
			question: 'I havent gotten my package yet, when is it coming?',
			answer: 'We will always do ground shipping as it is the cheapest, it takes about 1-3 days depending on holidays, and how close you live. Everything is based off of USPS, so please wait a bit more for your package to come.',
		},
		{
			question: 'Can allergic people wear X?',
			answer: 'Usually stainless steel is the safest option if you are allergic to certain metals because its hypoallergenic. Gold filled tends to be similar unless youre very allergic. Gold plated and Fashion jewelry are more dangerous options and should be avoided. ',
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
