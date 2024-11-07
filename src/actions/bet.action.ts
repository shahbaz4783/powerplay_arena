'use server';

import { db } from '@/src/lib/db';
import { revalidatePath } from 'next/cache';
import { betOptions } from '../constants/challenges';
import { FormResponse } from '../lib/types';

export async function placeBet(
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> {
	try {
		const betAmount = formData.get('betAmount');
		const challengeName = formData.get('challengeName');
		const selectedSide = formData.get('selectedSide');

		console.log({ betAmount, challengeName, selectedSide });

		const user = await db.profile.findUnique({
			where: { telegramId },
			select: { balance: true, bettingPasses: true },
		});

		return { message: { success: 'OK' } };

		// if (!user) {
		// 	return { success: false, message: 'User not found' };
		// }

		// if (user.balance < betAmount) {
		// 	return { success: false, message: 'Insufficient balance' };
		// }

		// if (user.bettingPasses < 1) {
		// 	return { success: false, message: 'No betting passes available' };
		// }

		// // Simulate the coin flip
		// const randomOutcome = Math.random();
		// const challenge = betOptions.find(
		// 	(option) => option.name === challengeName
		// );
		// if (!challenge) {
		// 	return { success: false, message: 'Invalid challenge' };
		// }

		// const isWin = randomOutcome <= challenge.odds;
		// const winAmount = isWin ? Math.round(betAmount * challenge.payout) : 0;

		// // Update user's balance and betting passes
		// await db.profile.update({
		// 	where: { telegramId },
		// 	data: {
		// 		balance: { increment: winAmount - betAmount },
		// 		bettingPasses: { decrement: 1 },
		// 	},
		// });

		// // Record the bet transaction
		// await db.transaction.create({
		// 	data: {
		// 		telegramId,
		// 		amount: betAmount,
		// 		type: 'BET_PLACED',
		// 		description: `Coin Flip Challenge: ${challengeName}, Side: ${selectedSide}`,
		// 	},
		// });

		// Record the win transaction if applicable
		// if (isWin) {
		// 	await db.transaction.create({
		// 		data: {
		// 			telegramId,
		// 			amount: winAmount,
		// 			type: 'BET_WON',
		// 			description: `Won Coin Flip Challenge: ${challengeName}`,
		// 		},
		// 	});
		// }

		revalidatePath('/bazar');

		// return {
		// 	success: true,
		// 	message: isWin ? 'Congratulations! You won!' : 'Better luck next time!',
		// 	result: isWin ? 'win' : 'lose',
		// 	winAmount,
		// };
	} catch (error) {
		console.error('Error placing bet:', error);
		return {
			message: { error: 'An error occurred while placing the bet' },
		};
	}
}
