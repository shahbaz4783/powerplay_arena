import { GameState } from "./types";

export const calculateRunsScored = (
  option: "normal" | "aggressive" | "defensive",
): number => {
  const baseChance = Math.random();
  switch (option) {
    case "aggressive":
      if (baseChance < 0.15) return 6;
      if (baseChance < 0.3) return 4;
      if (baseChance < 0.5) return 2;
      if (baseChance < 0.7) return 1;
      if (baseChance < 0.85) return 0;
      return -1; // Out
    case "defensive":
      if (baseChance < 0.4) return 1;
      if (baseChance < 0.6) return 0;
      if (baseChance < 0.8) return 2;
      if (baseChance < 0.95) return 0;
      return -1; // Out
    default: // normal
      if (baseChance < 0.05) return 6;
      if (baseChance < 0.2) return 4;
      if (baseChance < 0.4) return 2;
      if (baseChance < 0.65) return 1;
      if (baseChance < 0.9) return 0;
      return -1; // Out
  }
};

export const calculateRunRate = (gameState: GameState): string => {
  const { playerScore, computerScore, overs, balls, gamePhase } = gameState;
  const score = gamePhase === "batting" ? playerScore : computerScore;
  const totalOvers = overs + balls / 6;
  return totalOvers > 0 ? (score / totalOvers).toFixed(2) : "0.00";
};

export const calculateRequiredRunRate = (gameState: GameState): string => {
  const { target, playerScore, computerScore, overs, balls, gamePhase } =
    gameState;
  if (target === null) return "0.00";
  const remainingRuns =
    target - (gamePhase === "batting" ? playerScore : computerScore);
  const remainingBalls = 5 * 6 - (overs * 6 + balls);
  const remainingOvers = remainingBalls / 6;
  return remainingOvers > 0 ? (remainingRuns / remainingOvers).toFixed(2) : "∞";
};
