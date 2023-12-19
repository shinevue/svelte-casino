<script lang="ts">
	import { currentRound } from '$lib/firebase';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	let timer: any = null;
	let timeRemaining = 0;

	const update = async () => {
		const now = new Date().getTime();
		timeRemaining = $currentRound?.endTime.toMillis() - now;

		// if (timeRemaining < 0) {
		// 	clearInterval(timer);
		// 	await updateDoc(doc(db, 'rounds', 'currentRound'), { status: 'judging' });
		// }
	};
	const startTimer = () => {
		timer = setInterval(async () => {
			await update();
		}, 1000);
	};
	onMount(() => {
		startTimer();
	});
</script>

<div class="font-light py-3">
	<p
		class={Math.floor(timeRemaining / 1000) <= 10 && timeRemaining > 0
			? 'text-red-500'
			: 'text-stone-400'}
	>
		{timeRemaining > 0 ? format(timeRemaining, 'mm:ss') : 'Betting closed'}
	</p>
</div>
