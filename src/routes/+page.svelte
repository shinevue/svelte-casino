<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { getContext } from 'svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { format, formatDuration, intervalToDuration } from 'date-fns';
	import RoundListItem from '$lib/components/RoundListItem.svelte';
	import 'flowbite';
	import { calculateScore } from '$lib/helpers';
	let rangeSliderValue = 50; // Initial value

	// Function to handle changes in the range slider
	function handleRangeChange(event) {
		rangeSliderValue = event.target.value;
	}
	let roundActive = true;
	let timer = null;
	let countdown: number = getContext('countdown');

	onMount(() => {
		timer = setInterval(() => {
			countdown -= 1;
			if (countdown <= 0) {
				// Countdown finished
				countdown = 0;
				roundActive = false;
			}
		}, 1000);
	});
</script>

<div class="mx-auto flex flex-col h-screen">
	<div class="bg-dark text-white">
		<!-- <div class="flex justify-between">
			<p class="font-heading text-center text-2xl">Plats 1</p>
			<p class="font-heading text-center text-2xl">353 poäng</p>
		</div> -->

		<div class="w-full text-center pt-10 pb-10 bg-main bg-cover bg-top bg-no-repeat">
			<p class="font-heading text-2xl uppercase mb-3">Place your bet</p>
			<div class="font-[900] font-heading text-8xl">
				{rangeSliderValue}<span class="text-6xl">m</span>
			</div>
		</div>
		<div class="flex flex-col items-center px-3">
			<div class="w-full py-4">
				<label for="labels-range-input" class="sr-only">Labels range</label>
				<input
					id="default-range"
					type="range"
					disabled={!roundActive || null}
					bind:value={rangeSliderValue}
					on:input={handleRangeChange}
					class="w-full h-2 bg-stone-200 accent-orange appearance-none rounded-lg cursor-pointer"
				/>
				<div class="inline-flex justify-between w-full font-light mt-2">
					<span class="text-sm text-gray-300">0m</span>
					<span class="text-sm text-gray-300 opacity-50">25m</span>
					<span class="text-sm text-gray-300 opacity-50">50m</span>
					<span class="text-sm text-gray-300 opacity-50">75m</span>
					<span class="text-sm text-gray-300">100m</span>
				</div>
			</div>
			<Button id="bet-button" disabled={!roundActive}
				>{roundActive ? 'Place bet' : 'Bet placed'}</Button
			>
			<div class="font-light py-3">
				<p class={countdown > 10 || countdown === 0 ? 'text-stone-400' : 'text-red-500'}>
					{countdown > 0 ? format(new Date(countdown * 1000), 'mm:ss') : 'Round locked'}
				</p>
			</div>
		</div>
	</div>
	<div class="flex flex-[1] min-h-0 w-full flex-col px-3 bg-almost-white">
		<div class="flex flex-col gap-2 overflow-auto hide-scroll h-full pb-3" id="rounds">
			<h3 class="font-bold mt-2">Previous rounds</h3>
			<RoundListItem
				name="John"
				totalPoints={84}
				points={calculateScore(84, 57)}
				img="/img/john.jpg"
			/>
		</div>
	</div>
</div>

<MenuBottom />

<style>
	.h-screen {
		height: calc(100vh - 4rem) !important;
	}
</style>
