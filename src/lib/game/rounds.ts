// rounds.ts
import { currentRound, db } from '$lib/firebase';
import type { CurrentRound, Round } from '$lib/models/round.model';
import { addSeconds } from 'date-fns';
import { addDoc, collection, doc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';

export const endRound = async () => {
	// TODO set endTime to $now

	const batch = writeBatch(db);

	// Write to actual round
	batch.update(doc(db, 'rounds', currentRound.id), {
		isActive: false
	});

	// Write to currentRound
	batch.update(doc(db, 'rounds', 'currentRound'), {
		isActive: false,
		status: 'finished'
	});

	await batch.commit();
};

export const placeBet = async (roundId: string, userId: string, bet: number): Promise<void> => {
	const batch = writeBatch(db);

	// Write to actual round subcollection
	batch.set(doc(db, 'rounds', roundId, 'bets', userId), {
		value: bet
	});

	// Write to currentRound
	batch.update(doc(db, 'rounds', 'currentRound'), {
		[`bets.${userId}`]: bet
	});

	await batch.commit();
};

export const placeResult = async (
	roundId: string,
	userId: string,
	result: number
): Promise<void> => {
	const batch = writeBatch(db);

	// Write to actual round subcollection
	batch.set(doc(db, 'rounds', roundId, 'results', userId), {
		value: result
	});

	// Write map to currentRound
	batch.update(doc(db, 'rounds', 'currentRound'), {
		[`results.${userId}`]: result
	});

	await batch.commit();
};

export const startRound = async () => {
	// TODO batch set
	const currentDate = new Date();
	const endTime = addSeconds(currentDate, 30);

	const roundData: Round = {
		endTime: endTime,
		isActive: true,
		result: null,
		winningBet: null,
		betsLocked: false,
	};

	const round = await addDoc(collection(db, 'rounds'), roundData);

	const currentRoundData: CurrentRound = {
		roundId: round.id,
		status: 'betting',
    bets: {},
		results: {},
		...roundData
	};

	// Update a document in Firestore with information about the current round
	await setDoc(doc(db, 'rounds', 'currentRound'), currentRoundData);

	console.log('Round started with ID: ', round.id);

	// Change round status after 30 seconds
	setTimeout(async () => {
		await updateDoc(doc(db, 'rounds', 'currentRound'), { status: 'judging' });
	}, 30000);
};
