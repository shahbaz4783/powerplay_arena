"use server";

import { db } from "@/src/lib/db";
import { User } from "@telegram-apps/sdk-react";
import { MatchFormat, Transaction } from "@prisma/client";

export interface PaginatedResponse {
  transactions: Transaction[];
  hasMore: boolean;
}

export const saveOrUpdateUser = async (user: User) => {
  try {
    const formats: MatchFormat[] = ["BLITZ", "POWERPLAY", "CLASSIC"];

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
          languageCode: user.languageCode || "en",
          isPremium: user.isPremium,
          wallet: {
            create: {
              balance: 100,
            },
          },
          xp: {
            create: {
              totalXP: 0,
              level: 1,
            },
          },
          stats: {
            create: formats.map((format) => ({
              format,
            })),
          },
          transaction: {
            create: {
              amount: 100,
              type: "REWARD",
              description: "Joining bonus",
            },
          },
        },
      });

      // Fetch the wallet balance within the same transaction
      const walletInfo = await tx.wallet.findUnique({
        where: { userId: user.id },
        select: { balance: true },
      });

      return { user: upsertedUser, walletBalance: walletInfo?.balance };
    });

    console.log("User data saved/updated successfully");
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving/updating user:", error.message);
    } else {
      console.error("Something went wrong while saving/updating user");
    }
    throw error;
  }
};

export const getUserInfoById = async (userId: number) => {
  try {
    const result = await db.$transaction(async (tx) => {
      const walletInfo = await tx.wallet.findUnique({
        where: { userId },
        select: { balance: true },
      });

      const userXP = await tx.xP.findUnique({
        where: { userId },
        select: { level: true, totalXP: true },
      });

      if (!walletInfo) {
        throw new Error("User wallet not found");
      }

      return { walletInfo, userXP };
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user info:", error.message);
    } else {
      console.error("Something went wrong while fetching user info");
    }
    throw error;
  }
};

export const getUserTransactionById = async (
  userId: bigint,
  page: number = 1,
  pageSize: number = 20,
): Promise<PaginatedResponse> => {
  try {
    const skip = (page - 1) * pageSize;
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize + 1,
    });

    const hasMore = transactions.length > pageSize;
    const paginatedTransactions = transactions.slice(0, pageSize);

    return {
      transactions: paginatedTransactions,
      hasMore,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user transaction info:", error.message);
    } else {
      console.error("Something went wrong while fetching transaction info");
    }
    throw error;
  }
};

export const getUserStats = async (userId: number) => {
  try {
    const stats = await db.stats.findMany({
      where: {
        userId: BigInt(userId),
      },
    });

    const formattedStats = stats.reduce(
      (acc, stat) => {
        acc[stat.format] = stat;
        return acc;
      },
      {} as Record<string, (typeof stats)[0]>,
    );

    return formattedStats;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user stats info:", error.message);
    } else {
      console.error("Something went wrong while fetching stats info");
    }
    throw error;
  }
};

export const getUserRankings = async () => {
  try {
    return await db.user.findMany({
      where: {
        xp: {
          totalXP: {
            gt: 0,
          },
        },
      },
      orderBy: { xp: { totalXP: "desc" } },
      include: {
        xp: { select: { totalXP: true, level: true } },
      },
      take: 20,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user transaction info:", error.message);
    } else {
      console.error("Something went wrong while fetching transaction info");
    }
    throw error;
  }
};
