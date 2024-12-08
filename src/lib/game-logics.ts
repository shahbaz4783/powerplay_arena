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
		'-1': 0.08,
		0: 0.22,
		1: 0.25,
		2: 0.2,
		3: 0.01,
		4: 0.12,
		6: 0.08,
	},
	aggressive: {
		'-1': 0.2,
		0: 0.15,
		1: 0.15,
		2: 0.1,
		3: 0.01,
		4: 0.2,
		6: 0.2,
	},
	defensive: {
		'-1': 0.02,
		0: 0.3,
		1: 0.4,
		2: 0.15,
		3: 0.01,
		4: 0.04,
		6: 0.01,
	},
};

const bowlingMultipliers: {
	[key in BowlingType]: { [key in BattingStyle]: number };
} = {
	seam: { normal: 1, aggressive: 1, defensive: 1 },
	yorker: { normal: 0.9, aggressive: 0.8, defensive: 1.1 },
	bouncer: { normal: 0.9, aggressive: 1.1, defensive: 0.8 },
};

export const calculateRunsScored = (
	battingStyle: BattingStyle,
	bowlingType: BowlingType
): RunOutcome => {
	const baseChances = baseOutcomeChances[battingStyle];
	const multiplier = bowlingMultipliers[bowlingType][battingStyle];

	const adjustedChances: { [key in RunOutcome]: number } = Object.entries(
		baseChances
	).reduce((acc, [run, chance]) => {
		const adjustedChance = chance * multiplier;
		acc[run as unknown as RunOutcome] = adjustedChance;
		return acc;
	}, {} as { [key in RunOutcome]: number });

	const totalChance = Object.values(adjustedChances).reduce(
		(sum, chance) => sum + chance,
		0
	);

	const normalizedChances: { [key in RunOutcome]: number } = Object.entries(
		adjustedChances
	).reduce((acc, [run, chance]) => {
		acc[run as unknown as RunOutcome] = chance / totalChance;
		return acc;
	}, {} as { [key in RunOutcome]: number });

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

export const getOpponentBattingStrategy = (bowlingType: BowlingType): BattingStyle => {
	if (bowlingType === 'yorker') {
		return Math.random() < 0.7 ? 'defensive' : 'normal';
	}
	if (bowlingType === 'bouncer') {
		return Math.random() < 0.7 ? 'aggressive' : 'normal';
	}
	return Math.random() < 0.5 ? 'normal' : 'aggressive';
};

export const opponentBowling = (gameState: GameState): BowlingType => {
	const { player, opponent, currentInnings, target } = gameState;
	const battingTeam = currentInnings === 1 ? opponent : player;
	const remainingBalls = 30 - battingTeam.ballsFaced;
	const remainingWickets = 5 - battingTeam.wickets;
	const currentRunRate = battingTeam.runs / (battingTeam.ballsFaced / 6);

	if (currentInnings === 2 && target) {
		const requiredRunRate = (target - battingTeam.runs) / (remainingBalls / 6);

		if (requiredRunRate > 10 || remainingBalls <= 6) {
			return Math.random() < 0.6 ? 'yorker' : 'bouncer';
		} else if (requiredRunRate < 6 && remainingWickets <= 2) {
			return 'bouncer';
		}
	}

	if (remainingWickets <= 2 || (currentRunRate > 9 && remainingBalls > 12)) {
		return Math.random() < 0.7 ? 'yorker' : 'seam';
	}

	if (currentRunRate < 6 && remainingBalls <= 12) {
		return Math.random() < 0.6 ? 'bouncer' : 'seam';
	}

	// Default distribution
	const chance = Math.random();
	if (chance < 0.4) return 'seam';
	else if (chance < 0.7) return 'bouncer';
	else return 'yorker';
};

export const getCurrentInningsData = (
  gameState: GameState,
): InningsInterface => {
  if (gameState.gamePhase === "inningsOver") {
    console.log("mid innings");
    return gameState.toss.playMode === "defend"
      ? gameState.player
      : gameState.opponent;
  }

  if (gameState.currentInnings === 1) {
    console.log("mid innings 2");
    return gameState.gamePhase === "batting"
      ? gameState.player
      : gameState.opponent;
  } else {
    console.log("mid innings 3");
    return gameState.gamePhase === "batting"
      ? gameState.player
      : gameState.opponent;
  }
};

export const calculateRewards = (gameState: GameState) => {
  const { player, opponent } = gameState;
  const { margin, marginType } = gameState.matchResult;
  const {
    rewards: { four, runMargin, six, wicket },
  } = gameState.matchSetup;

  let winMarginReward = 0;
  const fourReward = player.fours * four;
  const sixerReward = player.sixes * six;
  const wicketTakenReward = opponent.wickets * wicket;

  if (gameState.matchResult.winner === "player") {
    if (margin && marginType === "runs") {
      winMarginReward = runMargin * margin;
    }
    if (margin && marginType === "wickets") {
      winMarginReward = wicket * margin;
    }
  }

  return {
    winMarginReward,
    fourReward,
    sixerReward,
    wicketTakenReward,
  };
};
