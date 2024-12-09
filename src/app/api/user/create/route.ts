import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import { nanoid } from 'nanoid';
import { LEVEL_DATA } from '@/src/constants/app-config';
import { User } from 'grammy/types';

interface ExtendedUser extends User {
	referralCode?: string;
}

export async function POST(request: NextRequest) {
	try {
		const userData: ExtendedUser = await request.json();
		const { id, first_name, last_name, username, is_premium, referralCode } =
			userData;

		const existingUser = await db.user.findUnique({
			where: { telegramId: id.toString() },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 400 }
			);
		}

		const newUser = await db.user.create({
			data: {
				telegramId: id.toString(),
				firstName: first_name,
				lastName: last_name || null,
				username: username || null,
				isPremium: is_premium || false,
				inviteCode: nanoid(8),
				avatarUrl: '',

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

				progress: {
					create: {
						levelName: LEVEL_DATA[0].name,
						xpForNextLevel: LEVEL_DATA[1].xpThreshold,
					},
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

		if (referralCode) {
			const referrer = await db.user.findUnique({
				where: { inviteCode: referralCode },
			});

			if (referrer) {
				await db.referralRecord.create({
					data: {
						referrerId: referrer.telegramId,
						referredId: newUser.telegramId,
						bonusAwarded: 100,
					},
				});

				// Update referrer's balance
				await db.userInventory.update({
					where: { telegramId: referrer.telegramId },
					data: { powerCoin: { increment: 100 } },
				});

				// Create transaction for referrer
				await db.transaction.create({
					data: {
						telegramId: referrer.telegramId,
						amount: 100,
						type: 'REWARD',
						balanceEffect: 'INCREMENT',
						description: 'Referral Bonus',
					},
				});
			}
		}
		return NextResponse.json(newUser);
	} catch (error) {
		console.error('Error in POST /api/user/create:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
