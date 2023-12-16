<script lang="ts">
	export let name: string = '';
	export let totalPoints: number = 0;
	export let points: number = 0;
	export let img: string = '/carl.jpg';
</script>

<div
	class="flex bg-white border border-1 border-gray-100 p-2.5 rounded-xl justify-between items-center"
>
	<div>
		<img
			class="w-14 h-14 p-0.5 rounded-full ring-1 ring-gray-300 object-cover"
			src={img}
			alt="Bordered avatar"
		/>
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
