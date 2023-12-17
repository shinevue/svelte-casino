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

<div class="mx-auto flex flex-col h-screen">
	<HeaderSmall>Leaderboard</HeaderSmall>
	<div class="flex flex-[1] min-h-0 w-full flex-col p-3 bg-almost-white">
		<AuthCheck>
			<div class="flex flex-col gap-2 hide-scroll h-full pb-3">
				{#each players as { name, photoURL }}
					<RoundListItem {name} totalPoints={84} points={calculateScore(84, 57)} img={photoURL} />
				{/each}
			</div>
		</AuthCheck>
	</div>
</div>

<MenuBottom />
