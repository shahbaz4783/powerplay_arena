'use server';

import { db } from '../lib/db';
import { getUserInfoById } from './user';

interface ReferralData {
	isReferred: boolean;
	referralRewardActive: boolean;
	referrerId: string | null;
}

export async function getReferralData(
	telegramId: string
): Promise<ReferralData> {
	const user = await getUserInfoById(telegramId);

	const referral = user?.referredBy[0];
	const isReferred = !!referral;
	const referrerId = isReferred ? referral.referrerId : null;
	const referralRewardExpireDate = referral?.expiresAt;

	const today = new Date();
	const referralRewardActive = referralRewardExpireDate
		? today <= referralRewardExpireDate
		: false;

	return { isReferred, referralRewardActive, referrerId };
}

export const getReferrerInfo = async (userId: string) => {
	const referralRecord = await db.referralRecord.findFirst({
		where: {
			referredId: userId,
		},
		include: {
			referrer: true,
		},
	});

	return referralRecord?.referrer || null;
};

export const getReferralsList = async (referrerId: string) => {
	return await db.referralRecord.findMany({
		where: {
			referrerId,
		},
		include: {
			referredUser: {
				select: {
					telegramId: true,
					firstName: true,
					username: true,
				},
			},
		},
	});
};

export const getDetailedReferralInfo = async (referralId: string) => {
	return await db.referralRecord.findUnique({
		where: {
			id: referralId,
		},
		include: {
			referredUser: true,
			voucherRewards: true,
		},
	});
};
