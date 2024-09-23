import {
  BattingStyle,
  BowlingType,
  GameState,
  InningsInterface,
  RunOutcome,
} from "../types/gameState";

interface OutcomeChances {
  [key: string]: { [key in RunOutcome]: number };
}

const baseOutcomeChances: OutcomeChances = {
  normal: {
    "-1": 0.08,
    0: 0.22,
    1: 0.25,
    2: 0.2,
    3: 0.05,
    4: 0.12,
    6: 0.08,
  },
  aggressive: {
    "-1": 0.15,
    0: 0.15,
    1: 0.15,
    2: 0.1,
    3: 0.05,
    4: 0.2,
    6: 0.2,
  },
  defensive: {
    "-1": 0.05,
    0: 0.3,
    1: 0.4,
    2: 0.15,
    3: 0.05,
    4: 0.04,
    6: 0.01,
  },
};

const bowlingMultipliers: {
  [key in BowlingType]: { [key in BattingStyle]: number };
} = {
  normal: { normal: 1, aggressive: 1, defensive: 1 },
  yorker: { normal: 0.9, aggressive: 0.8, defensive: 1.1 },
  bouncer: { normal: 0.9, aggressive: 1.1, defensive: 0.8 },
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

export const getOpponentBattingStrategy = (
  gameState: GameState,
  bowlingType: BowlingType,
): BattingStyle => {
  const { target, opponent, currentInnings } = gameState;

  const totalBalls = 30;
  const remainingBalls = totalBalls - opponent.ballsFaced;
  const remainingWickets = 5 - opponent.wickets;
  const currentRunRate = opponent.runs / (opponent.ballsFaced / 6);
  const requiredRunRate = target
    ? (target - opponent.runs) / (remainingBalls / 6)
    : 0;

  // Batting first strategy
  if (currentInnings === 1) {
    if (remainingBalls <= 12) {
      return "aggressive";
    } else if (remainingWickets <= 2) {
      return "defensive";
    } else if (currentRunRate < 6) {
      return "normal";
    } else {
      return Math.random() < 0.7 ? "normal" : "aggressive";
    }
  }

  // Chasing strategy
  if (target) {
    const runsDifference = target - opponent.runs;
    
    if (runsDifference <= 0) {
      return "defensive";
    } else if (requiredRunRate > 12 || (remainingBalls <= 6 && runsDifference > 12)) {
      return "aggressive";
    } else if (requiredRunRate > 8 || (remainingBalls <= 12 && runsDifference > 20)) {
      return Math.random() < 0.7 ? "aggressive" : "normal";
    } else if (requiredRunRate < 4 && remainingBalls > 12) {
      return Math.random() < 0.7 ? "defensive" : "normal";
    } else if (remainingWickets <= 2) {
      return requiredRunRate > 6 ? "normal" : "defensive";
    } else {
      return "normal";
    }
  }

  // Fallback to normal if no specific condition is met
  return "normal";
};

export const computerBowling = (gameState: GameState): BowlingType => {
  const { player, opponent, currentInnings, target } = gameState;
  const battingTeam = currentInnings === 1 ? opponent : player;
  const remainingBalls = 30 - battingTeam.ballsFaced;
  const remainingWickets = 5 - battingTeam.wickets;
  const currentRunRate = battingTeam.runs / (battingTeam.ballsFaced / 6);

  if (currentInnings === 2 && target) {
    const requiredRunRate = (target - battingTeam.runs) / (remainingBalls / 6);
    
    if (requiredRunRate > 10 || remainingBalls <= 6) {
      return Math.random() < 0.6 ? "yorker" : "bouncer";
    } else if (requiredRunRate < 6 && remainingWickets <= 2) {
      return "bouncer";
    }
  }

  if (remainingWickets <= 2 || (currentRunRate > 9 && remainingBalls > 12)) {
    return Math.random() < 0.7 ? "yorker" : "normal";
  }

  if (currentRunRate < 6 && remainingBalls <= 12) {
    return Math.random() < 0.6 ? "bouncer" : "normal";
  }

  // Default distribution
  const chance = Math.random();
  if (chance < 0.4) return "normal";
  else if (chance < 0.7) return "bouncer";
  else return "yorker";
};

export const getCurrentInningsData = (
  gameState: GameState,
): InningsInterface => {
  return gameState.currentInnings === 1
    ? gameState.gamePhase === "batting"
      ? gameState.player
      : gameState.opponent
    : gameState.gamePhase === "batting"
      ? gameState.player
      : gameState.opponent;
};