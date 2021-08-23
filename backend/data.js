import bcrypt from 'bcryptjs'
const data = {
	users: [
		{
			name: 'Howard',
			email: 'admin@example.com',
			password: bcrypt.hashSync('1234', 8),
			type: 'Regular',
			numOrders: 0,
			totalSpent: 0,
			isAdmin: true,
		},
		{
			name: 'Nicolas',
			email: 'user@example.com',
			password: bcrypt.hashSync('1234', 8),
			type: 'Regular',
			numOrders: 0,
			totalSpent: 0,
			isAdmin: false,
		},
	],
	products: [
		{
			name: '1 - Azabache',
			quality: 'Gold Filled',
			category: 'Ring',
			image: '/images/p1.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			colors: 'silver, gold',
			sizes: '6, 7, 8, 9, 10',
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'silver', size: 6 },
				{ countInStock: 20, style: 'silver', size: 7 },
				{ countInStock: 30, style: 'silver', size: 8 },
				{ countInStock: 40, style: 'silver', size: 9 },
				{ countInStock: 50, style: 'silver', size: 10 },
				{ countInStock: 10, style: 'gold', size: 6 },
				{ countInStock: 20, style: 'gold', size: 7 },
				{ countInStock: 30, style: 'gold', size: 8 },
				{ countInStock: 40, style: 'gold', size: 9 },
				{ countInStock: 50, style: 'gold', size: 10 },
			],
		},
		{
			name: '2 - Heart Ring',
			quality: 'Gold Filled',
			category: 'Ring',
			image: '/images/p2.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			colors: 'silver, gold',
			sizes: '6, 7, 8, 9, 10',
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'silver', size: 6 },
				{ countInStock: 20, style: 'silver', size: 7 },
				{ countInStock: 30, style: 'silver', size: 8 },
				{ countInStock: 40, style: 'silver', size: 9 },
				{ countInStock: 50, style: 'silver', size: 10 },
				{ countInStock: 10, style: 'gold', size: 6 },
				{ countInStock: 20, style: 'gold', size: 7 },
				{ countInStock: 30, style: 'gold', size: 8 },
				{ countInStock: 40, style: 'gold', size: 9 },
				{ countInStock: 50, style: 'gold', size: 10 },
			],
		},
		{
			name: '3 - Circle Ring',
			quality: 'Gold Filled',
			category: 'Ring',
			image: '/images/p3.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			colors: 'silver, gold',
			sizes: '6, 7, 8, 9, 10',
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'silver', size: 6 },
				{ countInStock: 20, style: 'silver', size: 7 },
				{ countInStock: 30, style: 'silver', size: 8 },
				{ countInStock: 40, style: 'silver', size: 9 },
				{ countInStock: 50, style: 'silver', size: 10 },
				{ countInStock: 10, style: 'gold', size: 6 },
				{ countInStock: 20, style: 'gold', size: 7 },
				{ countInStock: 30, style: 'gold', size: 8 },
				{ countInStock: 40, style: 'gold', size: 9 },
				{ countInStock: 50, style: 'gold', size: 10 },
			],
		},
		{
			name: '4 - Crystal Ring',
			quality: 'Gold Filled',
			category: 'Ring',
			image: '/images/p4.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			colors: 'silver, gold',
			sizes: '6, 7, 8, 9, 10',
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'silver', size: 6 },
				{ countInStock: 20, style: 'silver', size: 7 },
				{ countInStock: 30, style: 'silver', size: 8 },
				{ countInStock: 40, style: 'silver', size: 9 },
				{ countInStock: 50, style: 'silver', size: 10 },
				{ countInStock: 10, style: 'gold', size: 6 },
				{ countInStock: 20, style: 'gold', size: 7 },
				{ countInStock: 30, style: 'gold', size: 8 },
				{ countInStock: 40, style: 'gold', size: 9 },
				{ countInStock: 50, style: 'gold', size: 10 },
			],
		},
		{
			name: '14 - Gold Filled Tennis Chain',
			quality: 'Gold Filled',
			category: 'Necklace',
			image: '/images/p14.jpg',
			price: 10,
			wsPrice: 6,
			costPrice: 6,
			countInStock: 100,
			colors: 'silver, gold',
			description: 'high quality product',
			customizations: [
				{ countInStock: 50, style: 'silver', size: 0 },
				{ countInStock: 50, style: 'gold', size: 0 },
			],
		},
		{
			name: '15 - Eye anklet',
			quality: 'Gold Filled',
			category: 'Anklet',
			image: '/images/p15.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'red', size: 0 },
				{ countInStock: 20, style: 'blue', size: 0 },
				{ countInStock: 30, style: 'black', size: 0 },
				{ countInStock: 40, style: 'colorful', size: 0 },
				{ countInStock: 50, style: 'colorful2', size: 0 },
			],
		},
		{
			name: '16 - Eye bracelet',
			quality: 'Gold Filled',
			category: 'Bracelet',
			image: '/images/p16.jpg',
			price: 5,
			wsPrice: 2.5,
			costPrice: 2,
			countInStock: 100,
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'red', size: 0 },
				{ countInStock: 20, style: 'blue', size: 0 },
				{ countInStock: 30, style: 'black', size: 0 },
				{ countInStock: 40, style: 'colorful', size: 0 },
				{ countInStock: 50, style: 'colorful2', size: 0 },
			],
		},
		{
			name: '17 - Eye chain',
			quality: 'Gold Filled',
			category: 'Necklace',
			image: '/images/p17.jpg',
			price: 10,
			wsPrice: 4,
			costPrice: 4,
			countInStock: 100,
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'red', size: 0 },
				{ countInStock: 20, style: 'blue', size: 0 },
				{ countInStock: 30, style: 'black', size: 0 },
				{ countInStock: 40, style: 'colorful', size: 0 },
				{ countInStock: 50, style: 'colorful2', size: 0 },
			],
		},
		{
			name: '18 - Rhinestone cuban chain',
			quality: 'Stainless Steel',
			category: 'Necklace',
			image: '/images/p18.jpg',
			price: 15,
			wsPrice: 10,
			costPrice: 10,
			countInStock: 100,
			description: 'high quality product',
			customizations: [
				{ countInStock: 10, style: 'silver', size: 0 },
				{ countInStock: 20, style: 'gold', size: 0 },
			],
		},
		{
			name: '19 - Dz fashion earrings',
			quality: 'Fashion',
			category: 'Earring',
			image: '/images/p19.jpg',
			price: 6,
			wsPrice: 6,
			costPrice: 6,
			countInStock: 100,
			description: 'high quality product',
		},
		{
			name: '20 - Dz Balloons',
			quality: 'Not Applicable',
			category: 'Dz',
			image: '/images/p20.jpg',
			price: 6,
			wsPrice: 6,
			costPrice: 6,
			countInStock: 100,
			description: 'high quality product',
		},
	],
}

export default data
