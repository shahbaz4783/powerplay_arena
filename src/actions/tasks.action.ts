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
  const reward = Math.floor(Math.random() * 41) + 10;
  try {
    await db.wallet.update({
      where: { userId: telegramId },
      data: {
        balance: { increment: reward },
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
