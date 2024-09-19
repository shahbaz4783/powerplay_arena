export interface InningsInterface {
  runs: number;
  wickets: number;
  ballsFaced: number;
  oversPlayed: string;
  fours: number;
  sixes: number;
  runRate: string;
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
