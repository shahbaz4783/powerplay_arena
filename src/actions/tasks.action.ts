"use server";

import { revalidatePath } from "next/cache";
import { token } from "../lib/constants";
import { db } from "../lib/db";
import { FormResponse } from "../lib/types";
import { calculateReward } from "../lib/utils";
import { saveAwardToDatabase } from './game.action';
import { Milestone } from '../types/db.types';

export const giveTaskReward = async (telegramId: number, reward: number) => {
  await db.wallet.update({
    where: { userId: telegramId },
    data: {
      balance: { increment: reward },
    },
  });
};

export const dailyDrop = async (
  telegramId: number,
  prevState: FormResponse,
  formData: FormData,
): Promise<FormResponse> => {
  try {
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { telegramId },
        include: { wallet: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const now = new Date();
      const lastClaimed = user.lastClaimed ? new Date(user.lastClaimed) : null;

      if (lastClaimed) {
        const startOfToday = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
        );
        const endOfToday = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
          ),
        );

        if (lastClaimed >= startOfToday && lastClaimed < endOfToday) {
          throw new Error("You have already claimed your daily reward");
        }
      }

      let streak = user.streak + 1;
      if (streak > 7) streak = 1;

      console.log({ streak });

      const reward = calculateReward(streak);

      await tx.wallet.update({
        where: { userId: telegramId },
        data: {
          balance: { increment: reward },
        },
      });

      await tx.user.update({
        where: { telegramId },
        data: {
          lastClaimed: now,
          streak: streak,
        },
      });

      await tx.transaction.create({
        data: {
          userId: telegramId,
          amount: reward,
          type: "REWARD",
          description: `Daily reward claim (Day ${streak})`,
        },
      });

      return { reward, streak };
    });

    revalidatePath("/miniapp/reward");
    return {
      message: {
        success: `Congratulations! You've claimed ${result.reward} ${token.symbol} on Day ${result.streak} of your streak!`,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: "Something Went Wrong" } };
    }
  }
};


export async function claimAwardAction(userId: number, award: Milestone) {
	try {
		const response = await saveAwardToDatabase(userId, award);
		if (response.message.success) {
			return { success: true, message: 'Award claimed successfully!' };
		} else {
			return {
				success: false,
				message: response.message.error || 'Failed to claim award',
			};
		}
	} catch (error) {
		console.error('Error claiming award:', error);
		return {
			success: false,
			message: 'An error occurred while claiming the award',
		};
	}
}