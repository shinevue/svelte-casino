<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="h-screen w-full bg-login bg-cover bg-top bg-no-repeat">
	<div class="w-full h-full p-3 bg-dark/70 flex flex-col gap-2">
		<h1 class="py-6 w-full">
			<img src="img/logotype-light.png" alt="Hillclimb Casino" class="text-center" />
		</h1>

		<h2 class="text-2xl font-heading text-white text-center uppercase mt-[45%] mb-3">Sign in</h2>
		<label for="email" class="font-bold text-white">Email</label>
		<input
			type="email"
			name="email"
			id=""
			placeholder="email@example.com"
			class="transition text-dark font-bold rounded-xl text-sm px-5 py-4 w-full grow-0 focus:border-1 focus:border-orange focus:shadow-[0_0_3px_0_#f7550a] focus:outline-none"
		/>
		<Button>Sign in</Button>
	</div>
</div>
