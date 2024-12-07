'use server';

import { db } from '../lib/db';

export const getUserRankings = async () => {
	try {
		return await db.userProgression.findMany({
			where: {
				totalXP: { gt: 0 },
			},
			select: {
				level: true,
				levelName: true,
				user: true,
			},
			orderBy: { totalXP: 'desc' },
			take: 20,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('Something went wrong while fetching ranking data');
		}
		throw error;
	}
};
