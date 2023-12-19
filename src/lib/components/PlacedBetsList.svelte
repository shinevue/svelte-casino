<script lang="ts">
	import { onMount } from 'svelte';
	import RoundListItem from '$lib/components/RoundListItem.svelte';
	import { currentRound, db } from '$lib/firebase';
	import { calculateScore } from '$lib/helpers';
	import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
	import type { User } from '$lib/models/user.model';
	import AnimatedRoute from './AnimatedRoute.svelte';
	import _ from 'lodash';

	export let resultPlaced: boolean | null = null;
	export let result: number = 0;

	let users = {};

	const getUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'users'));
		// users = querySnapshot.docs.map((doc) => {return {doc.id, ...doc.data()}} );
		querySnapshot.forEach((doc) => {
			const data = {
				id: doc.id,
				...doc.data()
			};
			users[doc.id] = data;
		});
	};

	onMount(async () => {
		// Fetch user data for all users
		await getUsers();
	});
</script>

<div class="flex flex-col gap-2 overflow-auto hide-scroll h-full pb-3">
	<h3 class="font-bold mt-2">Placed bets</h3>
	{#if _.size($currentRound?.bets)}
		{#each Object.entries($currentRound?.bets) as [uid, bet]}
			{@const user = _.get(users, uid)}
			<div
				class="flex bg-white border border-1 border-gray-100 p-2.5 rounded-xl justify-between items-center"
			>
				<div>
					<img
						src={user?.photoURL ?? '/img/carl.jpg'}
						alt="Avatar"
						class="w-14 h-14 avatar mx-auto"
					/>
				</div>
				<div class="grow ps-2.5">
					<p class="font-bold">{user?.name}</p>
					<p class="text-gray-200 inline-flex items-center text-sm font-light">
						{#if resultPlaced}
							{calculateScore(bet, result)} points
						{:else}
							Points hidden
						{/if}
					</p>
				</div>
				<div>
					<div class="font-bold rounded-lg bg-orange w-14 p-2 text-center text-white">
						{#if resultPlaced}
							<p>{bet}m</p>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 mx-auto opacity-50 stroke-red-900"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>Waiting for bets...</p>
	{/if}
</div>
