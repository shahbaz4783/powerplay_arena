"use server";

import { GameState } from "@/src/lib/types";
import { redirect } from "next/navigation";

export async function updateGameState(
  currentState: GameState,
  newState: Partial<GameState>,
): Promise<GameState> {
  return { ...currentState, ...newState };
}

export async function addCommentary(
  currentCommentary: string[],
  newComment: string,
): Promise<string[]> {
  return [newComment, ...currentCommentary.slice(0, 2)];
}

export async function startQuickMatch(feeData: any) {
  console.log("Starting quick match with fee data:", feeData);
  redirect('/game')
}
