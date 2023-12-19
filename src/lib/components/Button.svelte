<script lang="ts">
	export let disabled: boolean = false;
	export const id: string = 'button';
	const classList = disabled
		? `button button-disabled cursor-default`
		: `button button-orange cursor-pointer`;
</script>

<button {id} type="button" class={classList} disabled={disabled || null} on:click>
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply transition text-white font-bold rounded-xl text-sm px-5 py-4 text-center grow w-full grow-0;
	}

	.button-orange {
		@apply bg-orange hover:bg-melon-800 focus:outline-none focus:ring-4 focus:ring-melon-300;
	}
	.button-blue {
		@apply bg-sky-500 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-melon-300;
	}

	.button-active {
		@apply bg-orange hover:bg-melon-800 focus:outline-none focus:ring-4 focus:ring-melon-300;
	}

	.button:disabled {
		@apply bg-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-300;
	}
</style>
