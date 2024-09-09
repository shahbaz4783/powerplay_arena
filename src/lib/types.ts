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

export interface GameState {
  gamePhase: 'toss' | 'batting' | 'bowling' | 'superOver' | 'result';
  tossWinner: 'player' | 'computerScore' | null;
  tossChoice: 'bat' | 'bowl' | null;
  currentInnings: 1 | 2;
  playerScore: number;
  cricketAIScore: number;
  wickets: number;
  overs: number;
  balls: number;
  target: number | null;
  superOverBattingFirst?: 'player' | 'cricketAI';
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  effect: (gameState: GameState) => Partial<GameState>;
  duration: number; // in balls
  cost: number;
}