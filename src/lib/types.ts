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
  // Game flow
  gamePhase: 'toss' | 'batting' | 'bowling' | 'superOver' | 'result';
  tossWinner: 'player' | 'computerAI' | null;
  tossChoice: 'bat' | 'bowl' | null;
  currentInnings: 1 | 2;
  
  // Scores
  playerScore: number;
  computerAIScore: number;
  target: number | null;
  
  // Current innings details
  wickets: number;
  overs: number;
  balls: number;
  
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
  matchResult: 'win' | 'loss' | 'tie' | null;
  winMargin: {
    runs?: number;
    wickets?: number;
  } | null;
  
  // Super over details
  superOverBattingFirst?: 'player' | 'computerAI';
  superOverPlayerScore?: number;
  superOverComputerAIScore?: number;
  
  // Reward calculation fields
  entryFee: number;
  potentialReward: number;
  bonusMultiplier: number;
  
  // Additional game statistics
  dotBalls: number;
  boundaries: number;
  highestPartnership: number;
  fastestBall: number;
  longestSix: number;
  
  // Special achievements
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