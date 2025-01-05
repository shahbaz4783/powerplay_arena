// types.ts
export interface PowerUp {
	id: string;
	name: string;
	level: number;
	maxLevel: number;
	imageUrl: string;
	description: string;
	upgradeCost: number;
	bonusPerLevel: number;
	currentBonus: number;
	nextLevelBonus: number;
	type: 'speed' | 'strength' | 'defense' | 'luck';
}

export interface Avatar {
	id: string;
	name: string;
	imageUrl: string;
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
	isEquipped: boolean;
	perks: string[];
	description: string;
	obtainedDate: string;
}

export interface Resource {
	id: string;
	type: 'coin_pack' | 'pass_pack' | 'bundle';
	name: string;
	imageUrl: string;
	quantity: number;
	contents: {
		coins?: number;
		gems?: number;
		duration?: number;
		items?: Array<{
			name: string;
			quantity: number;
			type: string;
		}>;
	};
	description: string;
	expiryDate?: string;
}
