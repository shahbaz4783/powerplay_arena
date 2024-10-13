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
          description: "Fees paid for quick match",
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
  if (!userId) return { message: { error: "No user Found" } };

  try {
    // Start a transaction
    await db.$transaction(async (tx) => {
      // Update user stats
      await tx.stats.upsert({
        where: {
          userId_format: {
            userId,
            format: gameState.matchSetup.format,
          },
        },
        update: {
          format: gameState.matchSetup.format,
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
          format: gameState.matchSetup.format,
          matchesWon: gameState.matchResult.winner === "player" ? 1 : 0,
          matchesLost: gameState.matchResult.winner === "opponent" ? 1 : 0,
          runsScored: gameState.player.runs,
          wicketsTaken: gameState.opponent.wickets,
          sixes: gameState.player.sixes,
          fours: gameState.player.fours,
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

      // Update user's wallet
      await tx.wallet.update({
        where: { userId },
        data: {
          balance: { increment: totalReward },
        },
      });

      await tx.transaction.create({
        data: {
          userId: userId,
          amount: totalReward,
          type: "MATCH_WINNINGS",
        },
      });

      return { totalReward, sixReward, fourReward, wicketReward, marginReward };
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
