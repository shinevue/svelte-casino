<script lang="ts">
	import { onMount } from 'svelte';

	export let rangeValue: number;
	export let onRangeChange: any;
	export let disabled: any = null;
	export let roundStatus: string;
	onMount(() => {
		rangeValue = 50;
	});
</script>

<label for="range-slider" class="sr-only">Distance slider</label>
<input
	id="range-slider"
	type="range"
	disabled={disabled || null}
	bind:value={rangeValue}
	on:input={onRangeChange}
	class="w-full h-2 bg-stone-200 accent-orange appearance-none rounded-lg cursor-pointer"
	class:result={roundStatus == 'judging'}
	class:bet={roundStatus == 'betting'}
/>
<div class="inline-flex justify-between w-full font-light mt-2">
	<span class="text-sm text-gray-300">0m</span>
	<span class="text-sm text-gray-300 opacity-50">25m</span>
	<span class="text-sm text-gray-300 opacity-50">50m</span>
	<span class="text-sm text-gray-300 opacity-50">75m</span>
	<span class="text-sm text-gray-300">100m</span>
</div>
