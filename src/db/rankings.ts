'use server';

import { db } from '../lib/db';

export const getUserRankings = async () => {
	try {
		return await db.profile.findMany({
			where: {
				totalXP: {
					gt: 0,
				},
			},
			select: {
				totalXP: true,
				level: true,
				levelName: true,
				avatarUrl: true,
				user: true,
			},
			orderBy: { totalXP: 'desc' },
			take: 20,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user transaction info:', error.message);
		} else {
			console.error('Something went wrong while fetching transaction info');
		}
		throw error;
	}
};
