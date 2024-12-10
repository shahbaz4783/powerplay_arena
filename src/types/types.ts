export interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export interface FormResponse {
  message: {
    success?: string;
    error?: string;
  };
}

export interface ServerResponseType<T = undefined> {
	success: boolean;
	message?: string;
	data?: T;
	error?: {
		code?: string;
		details?: any;
	};
}

export type InvoiceStatus = 'paid' | 'cancelled';

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
  wickets: number;
  overs: number;
  balls: number;
  dotBalls: number;

  // Detailed statistics for reward calculation
  playerStats: {
    runs: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    strikeRate: number;
  };
  bowlingStats: {
    wicketsTaken: number;
    oversBowled: number;
    runsConceded: number;
    economy: number;
  };

  // Match result details
  matchResult: "win" | "loss" | "tie" | null;
  winMargin: {
    runs?: number;
    wickets?: number;
  } | null;

  // Achievements
  achievements: string[];
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  effect: (gameState: GameState) => Partial<GameState>;
  duration: number; // in balls
  cost: number;
}

export type CommentaryEvent =
  | "start"
  | "secondInnings"
  | "dot"
  | "single"
  | "double"
  | "triple"
  | "four"
  | "six"
  | "wicket";
