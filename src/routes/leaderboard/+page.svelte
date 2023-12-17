<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { collection, getDocs } from 'firebase/firestore';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import RoundListItem from '$lib/components/RoundListItem.svelte';
	import { db, type UserData } from '$lib/firebase';
	import { calculateScore } from '$lib/helpers';
	import { onMount } from 'svelte';
	import HeaderSmall from '../profile/HeaderSmall.svelte';

	let players: UserData[] = [];

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'users'));
		players = querySnapshot.docs.map((doc) => doc.data());
	});
</script>

<AuthCheck>
	<div class="mx-auto flex flex-col h-screen">
		<HeaderSmall>Leaderboard</HeaderSmall>
		<div class="flex flex-[1] min-h-0 w-full flex-col p-3 bg-almost-white">
			<div class="flex flex-col gap-2 overflow-auto hide-scroll h-full pb-3" id="rounds">
				{#each players as { name, photoURL }}
					<RoundListItem {name} totalPoints={84} points={calculateScore(84, 57)} img={photoURL} />
				{/each}
			</div>
		</div>
	</div>

	<MenuBottom />
</AuthCheck>
