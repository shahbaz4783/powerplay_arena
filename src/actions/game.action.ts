"use server";

import { FormResponse } from "@/src/lib/types";
import { db } from "../lib/db";
import { GameState } from "../types/gameState";
import { redirect } from "next/navigation";
import { MatchFormat } from "@prisma/client";
import { isValidMatchFormat } from "../lib/utils";

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
    const formatValue = formData.get("format");
    const entryFee = parseInt(formData.get("entryFee") as string);

    if (user.wallet!.balance < entryFee) {
      return { message: { error: "Insufficient balance" } };
    }

    if (
      !formatValue ||
      typeof formatValue !== "string" ||
      !isValidMatchFormat(formatValue)
    ) {
      return { message: { error: "Invalid match format" } };
    }

    const matchFormat: MatchFormat = formatValue as MatchFormat;

    console.log(matchFormat);

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

      await tx.transaction.create({
        data: {
          userId: user.telegramId,
          amount: entryFee,
          type: "MATCH_FEE",
          description: `Match fees for ${matchFormat} format`,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      return { message: { error: error.message } };
    } else {
      return { message: { error: "Something went wrong" } };
    }
  }
  redirect("/game");
}

export async function saveMatchDataToDatabase(
  gameState: GameState,
  userId: bigint,
): Promise<FormResponse> {
  try {
    if (!userId) return { message: { error: "No user Found" } };
    await db.$transaction(async (tx) => {
      await tx.stats.update({
        where: {
          userId_format: {
            userId,
            format: gameState.matchSetup.format as MatchFormat,
          },
        },
        data: {
          matchesPlayed: { increment: 1 },
          matchesWon:
            gameState.matchResult.winner === "player"
              ? { increment: 1 }
              : undefined,
          matchesLost:
            gameState.matchResult.winner === "opponent"
              ? { increment: 1 }
              : undefined,
          matchesTie:
            gameState.matchResult.winner === "tie"
              ? { increment: 1 }
              : undefined,
          runsScored: { increment: gameState.player.runs },
          ballsFaced: { increment: gameState.player.ballsFaced },
          sixes: { increment: gameState.player.sixes },
          fours: { increment: gameState.player.fours },
          wicketsTaken: { increment: gameState.opponent.wickets },
          runsConceded: { increment: gameState.opponent.runs },
          ballsBowled: { increment: gameState.opponent.ballsFaced },
        },
      });

      // Calculate rewards
      const sixReward =
        gameState.player.sixes * gameState.matchSetup.rewards.six;
      const fourReward =
        gameState.player.fours * gameState.matchSetup.rewards.four;
      const wicketReward =
        gameState.opponent.wickets * gameState.matchSetup.rewards.wicket;
      let marginReward = 0;
      if (
        gameState.matchResult.winner === "player" &&
        gameState.matchResult.margin
      ) {
        marginReward =
          gameState.matchResult.margin * gameState.matchSetup.rewards.runMargin;
      }
      const totalReward = sixReward + fourReward + wicketReward + marginReward;

      // Calculate XP
      const baseXP = 100; // Base XP for completing a match
      const winBonus = gameState.matchResult.winner === "player" ? 50 : 0;
      const performanceXP =
        gameState.player.runs + gameState.opponent.wickets * 10;
      const totalXP = baseXP + winBonus + performanceXP;

      // Update user's wallet
      await tx.wallet.update({
        where: { userId },
        data: {
          balance: { increment: totalReward },
        },
      });

      // Update XP record
      const updatedXP = await tx.xP.update({
        where: { userId },
        data: {
          totalXP: { increment: totalXP },
          lastUpdated: new Date(),
        },
      });

      // Check for level up
      const newLevel = Math.floor(updatedXP.totalXP / 1000) + 1;
      if (newLevel > updatedXP.level) {
        await tx.xP.update({
          where: { userId },
          data: { level: newLevel },
        });
      }

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: userId,
          amount: totalReward,
          type: "MATCH_WINNINGS",
          description: `Match winnings for ${gameState.matchSetup.format} format`,
        },
      });
    });
  } catch (error) {
    console.error("Error ending match and claiming reward:", error);
    return {
      message: {
        error: "Failed to end match and claim reward. Please try again.",
      },
    };
  }
  redirect("/miniapp");
}
