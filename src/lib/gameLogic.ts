import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export const addBet = async (result: number) => {
	// Add logic to handle bet placement and result entry
	const betData = {
		result
		// Add any additional data related to the bet
	};

	// Add a new document with a generated id to the 'bets' collection
	const docRef = await addDoc(collection(db, 'bets'), betData);
	console.log('Bet placed with ID: ', docRef.id);
};

// betting is open for 30 seconds
// Get current round and set timer
// result polling is open until next round
// when all better have given a result, the winner is announced

// LOGIC
// I'm writing a betting app in sveltekit, typescript and firebase.
// There will be one leader/moderator.
// The leader starts a round:
//   a round is created in firestore
//   the round has an end time 30 seconds from when it's created
//   clients ui will change to display a countdown to the end of the round
//   client places a bet:
//     a bet is created in firestore
//     after bet is placed the user will be asked to enter the result
//     the result is stored along the bet
//     when all bets have a result the average of the results will be calculated
//     the user whose bet was closest to the result average is the winner
//     the winner is announced in the client and shown until next round
