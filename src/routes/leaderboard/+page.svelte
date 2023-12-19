<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import LeaderboardItem from '$lib/components/LeaderboardItem.svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import { db, type UserData } from '$lib/firebase';
	import { getOrdinalSuffix } from '$lib/helpers';
	import { collection, getDocs } from 'firebase/firestore';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import HeaderSmall from '../../lib/components/HeaderSmall.svelte';

	interface PlayerData extends UserData {
		score: number;
		uid: number;
	}

	let users: PlayerData[] = [];
	let scores = {};

	const getScores = async () => {
		const scoresSnapshot = await getDocs(collection(db, 'scores'));
		scoresSnapshot.forEach((score) => {
			_.set(scores, score.id, score.data().score);
		});
		return scores;
	};
	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'users'));
		scores = await getScores();
		users = querySnapshot.docs.map((doc) => {
			return { ...doc.data(), uid: doc.id, score: _.get(scores, doc.id) };
		});

		console.log(scores);
	});
</script>

<div class="mx-auto flex flex-col h-screen">
	<HeaderSmall>Leaderboard</HeaderSmall>
	<div class="flex flex-[1] min-h-0 w-full flex-col p-3 bg-almost-white">
		<AuthCheck>
			<div class="flex flex-col gap-2 hide-scroll h-full pb-3">
				{#each users as { name, photoURL, uid, score }, i}
					<LeaderboardItem
						{name}
						totalPoints={_.round(score ?? 0)}
						position={getOrdinalSuffix(i + 1)}
						img={photoURL}
					/>
				{/each}
			</div>
		</AuthCheck>
	</div>
</div>

<MenuBottom />
