"use server";

import { FormResponse } from "@/src/lib/types";
import { db } from "../lib/db";
import { GameState } from "../types/gameState";

export async function startQuickMatch(
  telegramId: number,
  prevState: FormResponse,
  formData: FormData,
): Promise<FormResponse> {
  try {
    const user = await db.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
      include: { wallet: true },
    });

    if (!user) {
      return { message: { error: "No user found" } };
    }

    const entryFee = parseInt(formData.get("entryFee") as string, 10);
    console.log(entryFee);

    if (isNaN(entryFee)) {
      return { message: { error: "Invalid entry fee" } };
    }

    if (user.wallet!.balance < entryFee) {
      return { message: { error: "Insufficient balance" } };
    }

    await db.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { userId: user.telegramId },
        data: { balance: { decrement: entryFee } },
      });

      await tx.match.create({
        data: {
          userId: user.telegramId,
          entryFee: entryFee,
          status: "IN_PROGRESS",
        },
      });
    });

    // Instead of redirecting, return a success message
    return { message: { success: "Match started successfully" } };
  } catch (error) {
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: "Something went wrong" } };
    }
  }
}

export async function saveMatchDataToDatabase(
  gameState: GameState,
  userId: bigint,
) {
  try {
    // Start a transaction
    return await db.$transaction(async (tx) => {
      // Update user stats
      await tx.stats.upsert({
        where: { userId },
        update: {
          matchesPlayed: { increment: 1 },
          matchesWon:
            gameState.matchResult.winner === "player"
              ? { increment: 1 }
              : undefined,
          matchesLost:
            gameState.matchResult.winner === "opponent"
              ? { increment: 1 }
              : undefined,
          runsScored: { increment: gameState.player.runs },
          wicketsTaken: { increment: gameState.opponent.wickets },
          sixes: { increment: gameState.player.sixes },
          fours: { increment: gameState.player.fours },
        },
        create: {
          userId,
          matchesPlayed: 1,
          matchesWon: gameState.matchResult.winner === "player" ? 1 : 0,
          matchesLost: gameState.matchResult.winner === "opponent" ? 1 : 0,
          runsScored: gameState.player.runs,
          wicketsTaken: gameState.opponent.wickets,
          sixes: gameState.player.sixes,
          fours: gameState.player.fours,
        },
      });

      // Calculate rewards
      const sixReward = gameState.player.sixes * 6;
      const fourReward = gameState.player.fours * 4;
      const totalReward = sixReward + fourReward;

      // Update user's wallet
      await tx.wallet.update({
        where: { userId },
        data: {
          balance: { increment: totalReward },
        },
      });

      // Update match status
      // await tx.match.update({
      //   where: {
      //     id: '324',
      //   },
      //   data: {
      //     status: "COMPLETED",
      //     reward: totalReward,
      //     score: gameState.player.runs,
      //   },
      // });

      return { success: true, reward: totalReward };
    });
  } catch (error) {
    console.error("Error ending match and claiming reward:", error);
    return { success: false, error: "Failed to end match and claim reward" };
  }
}
