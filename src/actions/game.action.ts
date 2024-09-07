'use server'

import { GameState } from "@/src/lib/types";

export async function updateGameState(currentState: GameState, newState: Partial<GameState>): Promise<GameState> {
  return { ...currentState, ...newState };
}

export async function addCommentary(currentCommentary: string[], newComment: string): Promise<string[]> {
  return [newComment, ...currentCommentary.slice(0, 2)];
}