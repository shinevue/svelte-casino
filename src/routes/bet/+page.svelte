<script lang="ts">
	import AdminCheck from '$lib/components/AdminCheck.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import PlacedBetsList from '$lib/components/PlacedBetsList.svelte';
	import { currentRound, user } from '$lib/firebase';
	import {
		endRound,
		placeBet as placeBetFirestore,
		placeResult as placeResultFirestore,
		startRound
	} from '$lib/game/rounds';
	import _ from 'lodash';
	import RangeSlider from '../../lib/components/RangeSlider.svelte';

	let handleRangeChange = (event) => {
		rangeSliderValue = event.target.value;
	};

	const placeBet = async () => {
		placeBetFirestore($currentRound!.roundId, $user!.uid, rangeSliderValue);
		console.log('Bet placed on round: ', $currentRound?.roundId);
	};

	const placeResult = async () => {
		placeResultFirestore($currentRound!.roundId, $user!.uid, rangeSliderValue);
		console.log('Result placed on round: ', $currentRound?.roundId);
	};

	let rangeSliderValue = 50; // Initial value

	// Check if the current user has placed a bet in the current round
	$: betPlaced = $currentRound?.bets
		? Object.keys($currentRound?.bets).includes($user?.uid)
		: false;

	// Check if the current user has placed a result in the current round
	$: resultPlaced = $currentRound?.results
		? Object.keys($currentRound?.results).includes($user?.uid)
		: false;

	// Round result
	$: result = $currentRound?.results ? _.round(_.mean(Object.values($currentRound?.results))) : 0;

	// Length of bets in current round
	$: bets = _.size($currentRound?.bets);
	// const _setJudging = async()=>{
	// 	$currentRound.
	// }
	const devMsg = async (event) => {
		// const subcollectionRef = collection(currentRound.ref, 'results');
		// Query a reference to a subcollection
		// const querySnapshot = await getDocs(collection(currentRound.ref, 'results'));
		// querySnapshot.forEach((doc) => {
		// 	// doc.data() is never undefined for query doc snapshots
		// 	console.log(doc.id, ' => ', doc.data());
		// });
	};
</script>

<div class="mx-auto flex flex-col h-screen-no-menu">
	<div class="bg-dark text-white">
		<div class="w-full text-center pt-10 pb-10 bg-main bg-cover bg-top bg-no-repeat">
			<p class="font-heading text-2xl uppercase mb-3">
				{#if $currentRound?.status == 'betting' && !betPlaced}
					Place your bet
				{:else if $currentRound?.status == 'betting' && betPlaced}
					Bet placed
				{:else if $currentRound?.status == 'judging' && !resultPlaced}
					Enter result
				{:else if $currentRound?.status == 'judging' && resultPlaced}
					Result
				{:else if $currentRound?.status == 'finished'}
					Round winner
				{:else}
					Waiting for next round
				{/if}
			</p>

			<div class="font-[900] font-heading text-8xl">
				{#if $currentRound?.status == 'judging' && resultPlaced}
					{result}<span class="text-6xl">m</span>
				{:else}
					{rangeSliderValue}<span class="text-6xl">m</span>
				{/if}
			</div>
		</div>
		<div class="flex flex-col items-center px-3">
			<div class="w-full py-4">
				{#if $currentRound?.status == 'betting'}
					<RangeSlider
						bind:rangeValue={rangeSliderValue}
						bind:onRangeChange={handleRangeChange}
						bind:roundStatus={$currentRound.status}
						bind:disabled={betPlaced}
					/>
				{:else if $currentRound?.status == 'judging'}
					<RangeSlider
						bind:rangeValue={rangeSliderValue}
						bind:onRangeChange={handleRangeChange}
						bind:roundStatus={$currentRound.status}
						bind:disabled={resultPlaced}
					/>
				{:else}
					<RangeSlider
						bind:rangeValue={rangeSliderValue}
						bind:onRangeChange={handleRangeChange}
						roundStatus="inactive"
						disabled={true}
					/>
				{/if}
			</div>

			{#if $currentRound?.status == 'betting'}
				<button
					class="button button-orange w-full"
					disabled={$currentRound?.status != 'betting' || betPlaced}
					on:click={placeBet}
				>
					{$currentRound?.betsLocked || betPlaced ? 'Bet placed' : 'Place bet'}
				</button>
			{:else if $currentRound?.status == 'judging'}
				<button
					class="button button-pink w-full"
					disabled={$currentRound?.status != 'judging' || resultPlaced}
					on:click={placeResult}
				>
					{resultPlaced ? 'Result submitted' : 'Submit result'}
				</button>
			{/if}

			<Countdown />
		</div>
	</div>
	<div class="flex flex-[1] min-h-0 w-full flex-col px-3 bg-almost-white">
		<PlacedBetsList bind:resultPlaced bind:result />
	</div>

	<AdminCheck>
		<div class="relative w-full">
			<div
				class="bg-[rgba(255,255,255,.5)] border border-gray-200 text-xs font-mono absolute bottom-[1rem] w-[calc(100%-2rem)] left-[1rem] rounded-lg p-3 grid grid-cols-2 gap-2"
			>
				<p class="grid grid-cols-2 overflow-scroll auto-rows-min">
					<span class="font-bold col-span-full">$currentRound</span>
					<span>ID: </span>
					<span>{$currentRound?.roundId}</span>
					<span>endTime: </span>
					<span>{$currentRound?.endTime}</span>
					<span>isActive:</span>
					<span>{$currentRound?.isActive}</span>
					<span>result:</span>
					<span>{$currentRound?.result}</span>
					<span>winningBet:</span>
					<span>{$currentRound?.winningBet}</span>
					<span>status:</span>
					<span>{$currentRound?.status}</span>
				</p>
				<p class="grid grid-cols-2 auto-rows-min">
					<span class="font-bold col-span-full">Other data</span>
					<span>betPlaced:</span>
					<span>{betPlaced}</span>
					<span>resultPlaced:</span>
					<span>{resultPlaced}</span>
					<span>bets:</span>
					<span>{bets}</span>
					<span>result:</span>
					<span>{result}</span>
				</p>
				<button
					on:click={startRound}
					class="bg-green-500 hover:bg-green-400 p-3 grow rounded-lg cursor-pointer"
					>Start round</button
				>
				<button
					on:click={endRound}
					class="bg-red-500 hover:bg-red-400 p-3 grow rounded-lg cursor-pointer">End round</button
				>

				<button on:click={devMsg}>Bets</button>
				<!-- <button on:click={_setJudging}>Set judging</button> -->
			</div>
		</div>
	</AdminCheck>
</div>

<MenuBottom />
