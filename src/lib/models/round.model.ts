import type { Timestamp } from 'firebase/firestore';

export interface Round {
	endTime: Date | Timestamp;
	isActive: boolean;
	result: number | null;
	winningBet: string | null;
	betsLocked: boolean;
}

export interface CurrentRound extends Round {
	roundId: string;
	status: 'betting' | 'judging' | 'finished';
	bets: Record<string, number>;
	results: Record<string, number>;
}
