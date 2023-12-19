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
