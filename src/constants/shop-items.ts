export const avatars = [
	{
		id: 1,
		name: 'Classic Cricketer',
		price: 100,
		requiredLvl: 1,
		description:
			"The embodiment of cricket's timeless elegance. This avatar showcases perfect technique, graceful strokes, and an unwavering respect for the game's traditions.",
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276717/classic-cricketer_eiq3bu.jpg',
	},
	{
		id: 6,
		name: 'Spin Wizard',
		price: 100,
		requiredLvl: 1,
		description:
			'A master of deception and flight, this avatar can turn the ball on any surface. With a bag full of variations, it keeps batsmen guessing and wickets tumbling.',
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276717/spin-wizard_w266gy.jpg',
	},
	{
		id: 2,
		name: 'All-Round Ace',
		price: 200,
		requiredLvl: 2,
		description:
			"Excelling in every aspect of the game, this avatar is the complete package. Equally adept at batting, bowling, and fielding, it's a game-changer in any situation.",
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276719/all-round-ace_txcqh0.jpg',
	},

	{
		id: 3,
		name: 'Power Hitter',
		price: 300,
		requiredLvl: 3,
		description:
			'A formidable batsman known for explosive shots and clearing boundaries with ease. This avatar radiates strength and confidence, ready to dominate any bowling attack.',
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276713/power-hitter_gavjyl.jpg',
	},
	{
		id: 5,
		name: 'The Finisher',
		price: 400,
		requiredLvl: 4,
		description:
			'Cool under pressure, this avatar thrives in high-stakes situations. Known for steering the team to victory in the final overs with calculated risks and precise shots.',
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276716/the-finisher_hxmbwe.jpg',
	},
	{
		id: 4,
		name: 'Captain Charisma',
		price: 500,
		requiredLvl: 5,
		description:
			'A natural leader with tactical brilliance and the ability to inspire. This avatar embodies the spirit of a captain who leads from the front and brings out the best in their team.',
		href: 'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730276718/captain-charisma_vtmduk.jpg',
	},
];

export const powerPassPacks = [
	{
		id: 'starter_pack',
		name: 'Starter Pack',
		price: 99,
		requiredLevel: 1,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Begin your journey with 5 Power Pass. Perfect for newcomers ready to explore the game!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 5,
	},
	{
		id: 'value_pack',
		name: 'Value Pack',
		price: 359,
		requiredLevel: 2,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Boost your gameplay with 20 Power Pass. Ideal for regular players seeking more opportunities. 10% discount included!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 20,
		discount: 10,
	},
	{
		id: 'pro_pack',
		name: 'Pro Pack',
		price: 799,
		requiredLevel: 3,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Elevate your experience with 50 Power Pass. For serious players aiming to maximize their potential. Enjoy a 20% discount!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 50,
		discount: 20,
	},
	{
		id: 'elite_bundle',
		name: 'Elite Bundle',
		price: 1399,
		requiredLevel: 4,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Power up with 100 Power Pass! This bundle is perfect for dedicated players who engage frequently. Save an impressive 30%!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 100,
		discount: 30,
	},
	{
		id: 'ultimate_vault',
		name: 'Ultimate Vault',
		price: 1999,
		requiredLevel: 5,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Unlock limitless play with our top-tier pack of 200 Power Pass. For the most passionate players who demand the best. Enjoy a massive 50% discount!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 200,
		discount: 50,
	},
];
