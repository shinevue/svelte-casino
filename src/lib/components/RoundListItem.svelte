<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';

	export let name: string = '';
	export let totalPoints: number = 0;
	export let points: number = 0;
	export let img: string = '/img/carl.jpg';
</script>

<div
	class="flex bg-white border border-1 border-gray-100 p-2.5 rounded-xl justify-between items-center"
>
	<div>
		<img src={img ?? '/img/carl.jpg'} alt="Avatar" class="w-14 h-14 avatar mx-auto" />
	</div>
	<div class="grow ps-2.5">
		<p class="font-bold">{name}</p>
		<p class="text-gray-200 inline-flex items-center text-sm font-light">
			{totalPoints} points
		</p>
	</div>
	<div>
		<p class="font-bold rounded-lg bg-orange w-12 p-2 text-center text-white">{points}</p>
	</div>
</div>
