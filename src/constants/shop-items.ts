export interface FeaturedItem {
	id: string;
	title: string;
	description: string;
	image: string;
}

export const featuredItems: FeaturedItem[] = [
	{
		id: 'exchange_center',
		title: 'Exchange Center',
		description: 'Convert between Power Coins and Power Passes seamlessly.',
		image: 'v1732709602/1e882a7d-15f2-4238-87e2-3a8dc735d3d2_y7ornu.jpg',
	},
	{
		id: 'avatars',
		title: 'Avatars',
		description: 'Personalize your look and boost XP with unique avatars.',
		image: 'v1732710262/81b6b8c4-6eba-4510-aa38-d00a4d8029de_cc246x.jpg',
	},
	{
		id: 'packs',
		title: 'Packs & Offers',
		description: 'Unlock exclusive coin and pass packs for greater rewards.',
		image: 'v1732709878/4726cf6b-330c-43b6-baf3-1c9a73e9b8ed_usuq5q.jpg',
	},
	{
		id: 'power_ups',
		title: 'Power-Ups',
		description:
			'Enhance your gameplay with upgradable assets for bigger rewards.',
		image: 'v1732710074/de3d8865-c979-4892-9942-812af2db29e5_wf5wfs.jpg',
	},
];

export const avatars = [
	{
		id: 'neon_valkyrie',
		name: 'Neon Valkyrie',
		price: 500,
		xpGain: 150,
		xpBoost: 15,
		requiredLvl: 1,
		description:
			'A symbol of resilience and power, glowing with futuristic energy.',
		href: 'v1732711938/4f6c0ca9-3b1d-4a22-8f51-39a0ef54a9b2_ucud8q.jpg',
	},
	{
		id: 'shadow_wraith',
		name: 'Shadow Wraith',
		price: 100,
		xpGain: 150,
		requiredLvl: 1,
		description:
			'An enigmatic force cloaked in mystery, moving silently through the void.',
		href: 'v1732711940/7f792b83-6003-48d5-a758-13de6f980913_yw9wwg.jpg',
	},
	{
		id: 'cyber_ninja',
		name: 'Cyber Phantom',
		price: 200,
		xpGain: 300,
		requiredLvl: 1,
		description:
			'A stealthy figure with unparalleled precision in the game’s mechanics.',
		href: 'v1732711939/5aa5417d-7a49-4515-a233-c66a1893ffca_lqgcrm.jpg',
	},
	{
		id: 'power_hitter',
		name: 'Core Striker',
		price: 300,
		xpGain: 500,
		requiredLvl: 1,
		description:
			'A master tactician driven to achieve peak performance with every move.',
		href: 'v1732711946/e8029123-2f09-47c5-88ed-4173cfe4f737_x6knd3.jpg',
	},
	{
		id: 'the_finisher',
		name: 'Digital Oracle',
		price: 400,
		xpGain: 1000,
		requiredLvl: 1,
		description:
			'An avatar with the power to foresee outcomes and adjust strategies to win.',
		href: 'v1732711943/ab11b923-ea91-4509-8aa7-6eb7851de41a_bw8onw.jpg',
	},
	{
		id: 'captain_charisma',
		name: 'Glitch Vanguard',
		price: 500,
		xpGain: 5000,
		requiredLvl: 1,
		description:
			'A trailblazer who thrives in unpredictable circumstances, embracing chaos.',
		href: 'v1732711940/a7e49839-37d4-4573-a05c-0ba5a39c199c_kmui33.jpg',
	},
	{
		id: 'quantum_guardian',
		name: 'Quantum Guardian',
		price: 500,
		xpGain: 5000,
		requiredLvl: 1,
		description:
			'A protector of balance in the virtual realms, exuding calm and authority.',
		href: 'v1732711940/5339b73d-f235-4180-ab69-fe0618dd6d92_fogdx9.jpg',
	},
	{
		id: 'luminous_archer',
		name: 'Luminous Archer',
		price: 500,
		xpGain: 5000,
		requiredLvl: 1,
		description:
			'A radiant figure with precision aim, striking with unerring accuracy.',
		href: 'v1732711945/e6b85442-d90e-4b08-b60d-bad4074603a0_xha5j1.jpg',
	},
	{
		id: 'neon_hunter',
		name: 'Neon Hunter',
		price: 500,
		xpGain: 5000,
		requiredLvl: 1,
		description:
			'An elusive figure who stalks the digital realm for untapped potential.',
		href: 'v1732711945/e69b05af-fc8c-42d4-9bd0-9b1c2666f2df_lqb6bn.jpg',
	},
];

export const powerPassPacks = [
	{
		id: 'starter_pack',
		name: 'Starter Pack',
		price: 99,
		requiredLevel: 1,
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
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
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
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
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
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
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
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
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Unlock limitless play with our top-tier pack of 200 Power Pass. For the most passionate players who demand the best. Enjoy a massive 50% discount!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 200,
		discount: 50,
	},
];
