import { MatchFormat } from '@prisma/client';

export type GameParticipant = 'player' | 'opponent';
export type TossChoice = 'bat' | 'bowl';
export type PlayMode = 'chase' | 'defend';
export type BattingStyle = 'normal' | 'aggressive' | 'defensive';
export type BowlingType = 'seam' | 'yorker' | 'bouncer';
export type RunOutcome = -1 | 0 | 1 | 2 | 3 | 4 | 6;
export type MarginType = 'runs' | 'wickets';
export type GamePhase = 'toss' | 'batting' | 'bowling' | 'inningsOver' | 'result';

export interface MatchSetup {
	format: MatchFormat;
	overs: 2 | 5 | 10;
	entryFee: number;
	passRequired: number;
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
	winner: GameParticipant | 'tie' | null;
	margin: number | null;
	marginType: MarginType | null;
}

export interface GameState {
	// Game flow
	matchId: string;
	transactionId: string;
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

export interface LevelInfo {
	level: number;
	name: string;
	currentXP: number;
	xpForNextLevel: number;
}
