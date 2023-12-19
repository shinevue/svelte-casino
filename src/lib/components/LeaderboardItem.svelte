<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';

	export let name: string = '';
	export let totalPoints: number = 0;
	export let position: string = '-';
	export let img: string = '/img/carl.jpg';
</script>

<div
	class="flex bg-white border border-1 border-gray-100 p-2.5 rounded-xl justify-between items-center leaderboard-item"
>
	<div>
		<img src={img ?? '/img/carl.jpg'} alt="Avatar" class="w-16 h-16 avatar mx-auto" />
	</div>
	<div class="grow ps-2.5">
		<p class="font-bold">{name}</p>
		<p class="text-gray-200 inline-flex items-center text-sm font-light">
			{totalPoints} points
		</p>
	</div>
	<div>
		<p class="position">{position}</p>
	</div>
</div>

<style lang="postcss">
	.position {
		@apply font-bold rounded-lg bg-dark w-12 p-2 text-center text-white;
	}
	.leaderboard-item:nth-child(-n + 3) .position {
		@apply bg-orange;
	}
</style>
