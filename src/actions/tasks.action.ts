"use server";

import { token } from "../lib/constants";
import { db } from "../lib/db";
import { FormResponse } from "../lib/types";

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
          throw new Error("You have already claimed your daily reward today");
        }
      }

      const reward = Math.floor(Math.random() * 41) + 10;

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
        },
      });

      // Create a transaction record
      await tx.transaction.create({
        data: {
          userId: telegramId,
          amount: reward,
          type: "REWARD",
          description: "Daily reward claim",
        },
      });

      return reward;
    });

    return { message: { success: `You got ${result} ${token.symbol}` } };
  } catch (error) {
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: "Something Went Wrong" } };
    }
  }
};
