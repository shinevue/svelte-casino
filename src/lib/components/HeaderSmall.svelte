<script lang="ts">
	export let bg: string = 'main';
	const classList = `w-full text-center pt-10 pb-10 bg-${bg} bg-cover bg-top bg-no-repeat`;
</script>

<div class="bg-dark text-white">
	<div class={classList}>
		<p class="font-heading text-2xl uppercase mb-3"><slot /></p>
	</div>
</div>
