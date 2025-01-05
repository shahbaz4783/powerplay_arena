export interface RepeatablePurchaseItem {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	coins?: number;
	passes?: number;
	stars?: number;
}

export const inGameResources: RepeatablePurchaseItem[] = [
	{
		id: 'stellar-boost-bundle',
		title: 'Stellar Boost Bundle',
		description:
			'A dynamic combo of coins and passes to accelerate your progress!',
		image: 'v1732874371/dd1adff0-944d-4b4d-aa52-0195c994ddd6_fawqvd.jpg',
		price: 149,
		coins: 10000,
		passes: 500,
	},
	{
		id: 'upgrad-bundle',
		title: 'Upgrade Bundle',
		description:
			'A combo of coins and passes to upgrade your powerup to legendary!',
		image: 'v1732874371/dd1adff0-944d-4b4d-aa52-0195c994ddd6_fawqvd.jpg',
		price: 999,
		coins: 50000,
		passes: 500,
	},
	{
		id: 'treasure-vault',
		title: 'Treasure Vault',
		description: 'A bountiful reserve of coins to enhance your gameplay!',
		image: 'v1732874370/0bbe8c70-2d0a-4661-852f-b7b584a8b9a6_z0hbxn.jpg',
		price: 49,
		coins: 5000,
	},
	{
		id: 'pass-stash',
		title: 'Pass Stash',
		description: 'A collection of game passes for uninterrupted play!',
		image: 'v1732874370/acdb409d-a9e5-44cb-a4e7-dd365c2c13b0_mdo6y2.jpg',
		price: 49,
		passes: 250,
	},
];
