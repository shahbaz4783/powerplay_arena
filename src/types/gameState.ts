export type GameParticipant = "player" | "opponent";
export type TossChoice = "bat" | "bowl";
export type PlayMode = "chase" | "defend";
export type BattingStyle = "normal" | "aggressive" | "defensive";
export type BowlingType = "normal" | "yorker" | "bouncer";
export type RunOutcome = -1 | 0 | 1 | 2 | 3 | 4 | 6;
export type MarginType = "runs" | "wickets";
export type GamePhase =
  | "toss"
  | "batting"
  | "bowling"
  | "inningsOver"
  | "result";

export type MatchFormat = "BLITZ" | "POWERPLAY" | "CLASSIC";

export interface MatchSetup {
  format: MatchFormat;
  overs: 2 | 5 | 10;
  entryFee: number;
  totalWickets: 2 | 5 | 10;
  rewards: {
    six: number;
    four: number;
    wicket: number;
    runMargin: number;
  };
}

export interface InningsData {
  totalBalls: 30 | 60;
  totalWickets: 5 | 10;
}

export interface InningsInterface {
  runs: number;
  wickets: number;
  ballsFaced: number;
  oversPlayed: string;
  fours: number;
  sixes: number;
  runRate: string;
  overInfo: RunOutcome[];
}

export interface TossInterface {
  winner: GameParticipant | null;
  choice: TossChoice | null;
  playMode: PlayMode | null;
}

export interface MatchResultInterface {
  winner: GameParticipant | "tie" | null;
  margin: number | null;
  marginType: MarginType | null;
}

export interface GameState {
  // Game flow
  gamePhase: GamePhase;
  currentInnings: 1 | 2;
  matchSetup: MatchSetup;

  // Toss
  toss: TossInterface;

  // Innings
  player: InningsInterface;
  opponent: InningsInterface;

  // Match result and target
  target: number | null;
  matchResult: MatchResultInterface;

  // Achievements unlocked
  achievements: string[];
}

export const MATCH_FORMATS: Record<MatchFormat, MatchSetup> = {
  BLITZ: {
    format: "BLITZ",
    overs: 2,
    entryFee: 50,
    totalWickets: 2,
    rewards: {
      six: 12,
      four: 6,
      wicket: 20,
      runMargin: 5,
    },
  },
  POWERPLAY: {
    format: "POWERPLAY",
    overs: 5,
    entryFee: 100,
    totalWickets: 5,
    rewards: {
      six: 6,
      four: 4,
      wicket: 15,
      runMargin: 4,
    },
  },
  CLASSIC: {
    format: "CLASSIC",
    overs: 10,
    entryFee: 200,
    totalWickets: 10,
    rewards: {
      six: 6,
      four: 4,
      wicket: 10,
      runMargin: 3,
    },
  },
};
