import { GameState } from "./types";

export const calculateRunsScored = (
  option: "normal" | "aggressive" | "defensive",
  bowlingType?: "normal" | "yorker" | "bouncer"
): number => {
  const baseChance = Math.random();
  let multiplier = 1;

  // Adjust multiplier based on bowling type
  if (bowlingType) {
    if (bowlingType === "yorker" && option === "aggressive") multiplier = 0.7;
    if (bowlingType === "yorker" && option === "defensive") multiplier = 1.2;
    if (bowlingType === "bouncer" && option === "aggressive") multiplier = 1.2;
    if (bowlingType === "bouncer" && option === "defensive") multiplier = 0.7;
  }

  switch (option) {
    case "aggressive":
      if (baseChance < 0.15 * multiplier) return 6;
      if (baseChance < 0.3 * multiplier) return 4;
      if (baseChance < 0.5 * multiplier) return 2;
      if (baseChance < 0.7 * multiplier) return 1;
      if (baseChance < 0.85 * multiplier) return 0;
      return -1; // Out
    case "defensive":
      if (baseChance < 0.4 * multiplier) return 1;
      if (baseChance < 0.6 * multiplier) return 0;
      if (baseChance < 0.8 * multiplier) return 2;
      if (baseChance < 0.95 * multiplier) return 0;
      return -1; // Out
    default: // normal
      if (baseChance < 0.05 * multiplier) return 6;
      if (baseChance < 0.2 * multiplier) return 4;
      if (baseChance < 0.4 * multiplier) return 2;
      if (baseChance < 0.65 * multiplier) return 1;
      if (baseChance < 0.9 * multiplier) return 0;
      return -1; // Out
  }
};

export const calculateRunRate = (gameState: GameState): string => {
  const { playerScore, computerAIScore, overs, balls, gamePhase } = gameState;
  const score = gameState.gamePhase === "batting" ? playerScore : computerAIScore;
  const totalOvers = overs + balls / 6;
  return totalOvers > 0 ? (score / totalOvers).toFixed(2) : "0.00";
};

export const calculateRequiredRunRate = (gameState: GameState): string => {
  const { target, playerScore, computerAIScore, overs, balls, gamePhase } = gameState;
  if (target === null) return "0.00";
  const remainingRuns = target - (gamePhase === "batting" ? playerScore : computerAIScore);
  const remainingBalls = 5 * 6 - (overs * 6 + balls);
  const remainingOvers = remainingBalls / 6;
  return remainingOvers > 0 ? (remainingRuns / remainingOvers).toFixed(2) : "∞";
};

export const getCricketAIBattingStrategy = (gameState: GameState, bowlingType: "normal" | "yorker" | "bouncer"): "normal" | "aggressive" | "defensive" => {
  const { target, computerAIScore, overs, balls } = gameState;
  const remainingBalls = 5 * 6 - (overs * 6 + balls);
  const requiredRunRate = target ? (target - computerAIScore) / (remainingBalls / 6) : 0;

  if (requiredRunRate > 10 || (remainingBalls <= 12 && target && computerAIScore < target)) {
    return "aggressive";
  } else if (requiredRunRate < 4 || (overs < 2 && balls < 3)) {
    return "defensive";
  } else {
    // Adjust strategy based on bowling type
    if (bowlingType === "yorker") return "defensive";
    if (bowlingType === "bouncer") return "aggressive";
    return "normal";
  }
};