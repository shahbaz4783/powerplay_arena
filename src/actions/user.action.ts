"use server";

import { db } from "@/src/lib/db";
import { User } from "@telegram-apps/sdk-react";
import { BetType, MatchFormat, Transaction } from '@prisma/client';
import { LEVEL_DATA } from '../constants/app-config';
import { avatars } from '../constants/shop-items';
import { responseMessages } from '../constants/messages';
import { revalidatePath } from 'next/cache';

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
				where: { telegramId: user.id },
				update: {
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					languageCode: user.languageCode,
					isPremium: user.isPremium,
				},
				create: {
					telegramId: user.id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					languageCode: user.languageCode || 'en',
					isPremium: user.isPremium,
					profile: {
						create: {
							balance: 500,
							avatarUrl: avatars[0].href,
							powerPass: 5,
							levelName: LEVEL_DATA[0].name,
							xpForNextLevel: LEVEL_DATA[1].xpThreshold,
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
					transaction: {
						create: {
							amount: 500,
							type: 'REWARD',
							balanceEffect: 'INCREMENT',
							description: 'Welcome Bonus',
						},
					},
					award: {
						create: {
							awardId: 'new_player_join',
							title: 'A New Legend Rises',
							description:
								"Your quest for glory begins now. Show the world what you're made of!",
						},
					},
				},
			});

			// Fetch the wallet balance within the same transaction
			const walletInfo = await tx.profile.findUnique({
				where: { telegramId: user.id },
				select: { balance: true },
			});

			return { user: upsertedUser, walletBalance: walletInfo?.balance };
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

export const updateAvatar = async (telegramId: number, avatarUrl: string) => {
	try {
		await db.profile.update({
			where: { telegramId },
			data: {
				avatarUrl,
			},
		});
		revalidatePath('/miniapp');
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
};