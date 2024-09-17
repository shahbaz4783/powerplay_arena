export interface PlayerStats {
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

export interface BowlingStats {
  wicketsTaken: number;
  oversBowled: number;
  runsConceded: number;
  economy: number;
}

export interface GameState {
  // Game flow
  gamePhase: "toss" | "batting" | "bowling" | "result";
  tossWinner: "player" | "computerAI" | null;
  tossChoice: "bat" | "bowl" | null;
  currentInnings: 1 | 2;
  entryFee: number;

  // Scores
  playerScore: number;
  computerAIScore: number;
  target: number | null;

  // Current innings details
  playerWickets: number;
  computerAIWickets: number;
  overs: number;
  balls: number;
  dotBalls: number;

  // Detailed statistics
  playerStats: PlayerStats;
  computerAIStats: PlayerStats;
  playerBowlingStats: BowlingStats;
  computerAIBowlingStats: BowlingStats;

  // Match result details
  matchResult: "win" | "loss" | "tie" | null;
  winMargin: {
    runs?: number;
    wickets?: number;
  } | null;

  // Achievements
  achievements: string[];
}