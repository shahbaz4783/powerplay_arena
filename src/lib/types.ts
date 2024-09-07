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

export type GamePhase = "toss" | "batting" | "bowling" | "result";

export interface GameState {
  gamePhase: GamePhase;
  tossWinner: "player" | "computer" | null;
  tossChoice: "bat" | "bowl" | null;
  currentInnings: 1 | 2;
  playerScore: number;
  computerScore: number;
  wickets: number;
  overs: number;
  balls: number;
  target: number | null;
}
