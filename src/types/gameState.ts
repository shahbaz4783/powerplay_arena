export interface BattingInterface {
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
}

export interface BowlingInterface {
  wicketsTaken: number;
  ballsBowled: number;
  runsConceded: number;
}

export interface InningsInterface {
  runs: number;
  wickets: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  runRate: number;
}

export interface GameState {
  // Game flow
  gamePhase: "toss" | "batting" | "bowling" | "inningsOver" | "result";
  tossWinner: "player" | "opponent" | null;
  tossChoice: "bat" | "bowl" | null;
  currentInnings: 1 | 2;
  entryFee: number;

  // Innings
  playerInnings: InningsInterface;
  opponentInnings: InningsInterface;

  // Match result and target
  target: number | null;
  matchResult: "win" | "loss" | "tie" | null;
  resultMargin: {
    runs?: number;
    wickets?: number;
  } | null;

  // Achievements unlocked
  achievements: string[];
}
