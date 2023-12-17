<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';

	export let name: string = '';
	export let totalPoints: number = 0;
	export let points: number = 0;
	export let img: string = '/carl.jpg';
</script>

<div
	class="flex bg-white border border-1 border-gray-100 p-2.5 rounded-xl justify-between items-center"
>
	<div>
		<Avatar photoURL={img} />
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
