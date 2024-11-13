import { PowerUp, GameState } from '../types/types';

export const powerUps: PowerUp[] = [
	{
		id: 'powerHitter',
		name: 'Power Hitter',
		description: 'Increases the chance of hitting boundaries for 6 balls',
		effect: (gameState: GameState) => ({
			// This effect will be applied in the calculateRunsScored function
		}),
		duration: 6,
		cost: 100,
	},
	{
		id: 'precisionBowling',
		name: 'Precision Bowling',
		description: "Reduces the opponent's chance of scoring runs for 6 balls",
		effect: (gameState: GameState) => ({
			// This effect will be applied in the calculateRunsScored function
		}),
		duration: 6,
		cost: 100,
	},
	{
		id: 'fieldingBoost',
		name: 'Fielding Boost',
		description: 'Increases the chance of getting the opponent out for 6 balls',
		effect: (gameState: GameState) => ({
			// This effect will be applied in the calculateRunsScored function
		}),
		duration: 6,
		cost: 100,
	},
	{
		id: 'secondChance',
		name: 'Second Chance',
		description: 'Prevents the next out, consuming the power-up',
		effect: (gameState: GameState) => ({
			// This effect will be applied when a wicket is about to fall
		}),
		duration: 1,
		cost: 150,
	},
	{
		id: 'runBonus',
		name: 'Run Bonus',
		description: 'Adds an extra run to every scoring shot for 6 balls',
		effect: (gameState: GameState) => ({
			// This effect will be applied after calculating runs
		}),
		duration: 6,
		cost: 120,
	},
];
