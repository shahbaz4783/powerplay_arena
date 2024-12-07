"use server";

import { db } from '@/src/lib/db';
import { BetType, MatchFormat } from '@prisma/client';
import { LEVEL_DATA } from '../constants/app-config';
import { avatars } from '../constants/shop-items';
import { responseMessages } from '../constants/messages';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';
import { User } from '@telegram-apps/sdk-react';

export const saveOrUpdateUser = async (user: User) => {
	try {
		const formats: MatchFormat[] = ['BLITZ', 'POWERPLAY', 'CLASSIC'];
		const betTypes: BetType[] = [
			'SAFE_BET',
			'CLASSIC_FLIP',
			'TRIPLE_SHOT',
			'JACKPOT',
		];

		const result = await db.$transaction(async (tx) => {
			const upsertedUser = await tx.user.upsert({
				where: { telegramId: user.id.toString() },
				update: {
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					isPremium: user.isPremium,
				},
				create: {
					telegramId: user.id.toString(),
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					isPremium: user.isPremium,
					inviteCode: nanoid(8),
					avatarUrl: avatars[0].href,

					progress: {
						create: {
							levelName: LEVEL_DATA[0].name,
							xpForNextLevel: LEVEL_DATA[1].xpThreshold,
						},
					},

					inventory: {
						create: {
							powerCoin: 500,
							powerPass: 10,

							badge: {
								create: {
									awardId: 'new_player_join',
									title: 'A New Legend Rises',
									description:
										"Your quest for glory begins now. Show the world what you're made of!",
								},
							},
						},
					},

					betStats: {
						create: betTypes.map((betType) => ({
							betType,
						})),
					},

					stats: {
						create: formats.map((format) => ({
							format,
						})),
					},

					transactions: {
						create: {
							amount: 500,
							type: 'REWARD',
							balanceEffect: 'INCREMENT',
							description: 'Welcome Bonus',
						},
					},
				},
			});

			return { user: upsertedUser };
		});

		console.log('User data saved/updated successfully');
		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error saving/updating user:', error.message);
		} else {
			console.error('Something went wrong while saving/updating user');
		}
		throw error;
	}
};

export const updateAvatar = async (telegramId: string, avatarUrl: string) => {
	try {
		await db.user.update({
			where: { telegramId },
			data: {
				avatarUrl,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: { error: error.message },
			};
		} else {
			return {
				message: { error: responseMessages.general.error.unexpectedError },
			};
		}
	}
	revalidatePath('/miniapp');
};