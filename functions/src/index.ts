/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
import * as functions from 'firebase-functions';
import * as logger from 'firebase-functions/logger';
// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import _ = require('lodash');

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const calculateScore = (bet: number, result: number, max = 100) => {
	return max - Math.abs(bet - result);
};

admin.initializeApp();
const db = admin.firestore();

exports.countResults = functions.firestore
	.document('rounds/{roundId}/{subcollection}/{itemId}')
	.onWrite(async (change, context) => {
		let result = 0;
		const roundId = context.params.roundId;
		if (context.params.subcollection == 'results') {
			logger.info('Updating result on', roundId);
			const roundRef = db.doc(`rounds/${roundId}`);
			const resultsSnapshot = await roundRef.collection('results').get();
			const results: number[] = [];
			resultsSnapshot.forEach((doc) => {
				results.push(doc.data().value);
			});
			result = _.mean(results);
			roundRef.update({ result: result });
		}
	});

exports.updateScores = functions.firestore
	.document('rounds/{roundId}')
	.onUpdate(async (change, context) => {
		if (change.before.get('result') != change.after.get('result')) {
			const batch = db.batch();
			let scores = {};
			const roundId = context.params.roundId;
			logger.info('Updating leaderboard');

			try {
				const roundsSnapshot = await db.collection('rounds').get();

				for (const round of roundsSnapshot.docs) {
					const result = round.get('result');
					if (round.id !== 'currentRound') {
						const betsSnapshot = await round.ref.collection('bets').get();

						betsSnapshot.forEach((bet) => {
							const score = calculateScore(bet.data().value, result);

							if (_.get(scores, bet.id)) {
								scores = _.update({ ...scores }, bet.id, (value) => value + score);
							} else {
								_.set(scores, bet.id, score);
							}
						});
					}
				}

				// Update scores collection
				_.forIn(scores, (value, key) => {
					logger.info('Score:', value, '@', key);
					const docRef = db.doc(`scores/${key}`);
					batch.set(docRef, { score: _.get(scores, key) });
				});
				// Commit scores
				await batch.commit();

				// Continue with batch commit or any other logic here
			} catch (error) {
				console.error('Error updating scores:', error);
			}
		}
	});
