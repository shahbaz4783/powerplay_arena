"use server";

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
    const user = await db.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      return { message: { error: "User not found" } };
    }

    const now = new Date();
    const lastClaimed = user.lastClaimed ? new Date(user.lastClaimed) : null;

    if (lastClaimed) {
      const startOfToday = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
      );
      const endOfToday = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
      );

      if (lastClaimed >= startOfToday && lastClaimed < endOfToday) {
        return {
          message: {
            error: "You have already claimed your daily reward today",
          },
        };
      }
    }

    const reward = Math.floor(Math.random() * 41) + 10;

    await db.wallet.update({
      where: { userId: telegramId },
      data: {
        balance: { increment: reward },
      },
    });
    
    await db.user.update({
      where: { telegramId },
      data: {
        lastClaimed: now,
      },
    });
    return { message: { success: `You got ${reward} Gems` } };
  } catch (error) {
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: "Something Went Wrong" } };
    }
  }
};
