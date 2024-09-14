import { GameState } from "./types";

type BattingStyle = "normal" | "aggressive" | "defensive";
export type BowlingType = "normal" | "yorker" | "bouncer";
type RunOutcome = -1 | 0 | 1 | 2 | 3 | 4 | 6;

interface OutcomeChances {
  [key: string]: { [key in RunOutcome]: number };
}

const baseOutcomeChances: OutcomeChances = {
  normal: {
    "-1": 0.1,
    0: 0.25,
    1: 0.25,
    2: 0.2,
    3: 0.05,
    4: 0.1,
    6: 0.05,
  },
  aggressive: {
    "-1": 0.2,
    0: 0.2,
    1: 0.18,
    2: 0.1,
    3: 0.02,
    4: 0.15,
    6: 0.15,
  },
  defensive: {
    "-1": 0.05,
    0: 0.35,
    1: 0.4,
    2: 0.15,
    3: 0.03,
    4: 0.02,
    6: 0.005,
  },
};

const bowlingMultipliers: {
  [key in BowlingType]: { [key in BattingStyle]: number };
} = {
  normal: { normal: 1, aggressive: 1, defensive: 1 },
  yorker: { normal: 0.9, aggressive: 0.7, defensive: 1.2 },
  bouncer: { normal: 0.9, aggressive: 1.2, defensive: 0.7 },
};

export const calculateRunsScored = (
  battingStyle: BattingStyle,
  bowlingType: BowlingType,
): RunOutcome => {
  const baseChances = baseOutcomeChances[battingStyle];
  const multiplier = bowlingMultipliers[bowlingType][battingStyle];

  const adjustedChances: { [key in RunOutcome]: number } = Object.entries(
    baseChances,
  ).reduce(
    (acc, [run, chance]) => {
      const adjustedChance = chance * multiplier;
      acc[run as unknown as RunOutcome] = adjustedChance;
      return acc;
    },
    {} as { [key in RunOutcome]: number },
  );

  const totalChance = Object.values(adjustedChances).reduce(
    (sum, chance) => sum + chance,
    0,
  );
  const normalizedChances: { [key in RunOutcome]: number } = Object.entries(
    adjustedChances,
  ).reduce(
    (acc, [run, chance]) => {
      acc[run as unknown as RunOutcome] = chance / totalChance;
      return acc;
    },
    {} as { [key in RunOutcome]: number },
  );

  const random = Math.random();
  let cumulativeChance = 0;

  for (const [run, chance] of Object.entries(normalizedChances)) {
    cumulativeChance += chance;
    if (random < cumulativeChance) {
      return parseInt(run) as RunOutcome;
    }
  }

  return 0;
};

export const calculateRunRate = (gameState: GameState): string => {
  const { playerScore, computerAIScore, overs, balls, gamePhase } = gameState;
  const score =
    gameState.gamePhase === "batting" ? playerScore : computerAIScore;
  const totalOvers = overs + balls / 6;
  return totalOvers > 0 ? (score / totalOvers).toFixed(2) : "0.00";
};

export const calculateRequiredRunRate = (gameState: GameState): string => {
  const { target, playerScore, computerAIScore, overs, balls, gamePhase } =
    gameState;
  if (target === null) return "0.00";
  const remainingRuns =
    target - (gamePhase === "batting" ? playerScore : computerAIScore);
  const remainingBalls = 5 * 6 - (overs * 6 + balls);
  const remainingOvers = remainingBalls / 6;
  return remainingOvers > 0 ? (remainingRuns / remainingOvers).toFixed(2) : "∞";
};

export const getCricketAIBattingStrategy = (
  gameState: GameState,
  bowlingType: "normal" | "yorker" | "bouncer",
): "normal" | "aggressive" | "defensive" => {
  const { target, computerAIScore, overs, balls } = gameState;
  const remainingBalls = 5 * 6 - (overs * 6 + balls);
  const requiredRunRate = target
    ? (target - computerAIScore) / (remainingBalls / 6)
    : 0;

  if (
    requiredRunRate > 10 ||
    (remainingBalls <= 12 && target && computerAIScore < target)
  ) {
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
