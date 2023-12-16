<script lang="ts">
	export let disabled: boolean = false;
	export const id: string = 'button';
</script>

<button
	{id}
	type="button"
	class={disabled ? 'button button-disabled cursor-default' : 'button button-active cursor-pointer'}
	disabled={disabled || null}
>
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply transition text-white font-bold rounded-xl text-sm px-5 py-4 text-center grow w-full grow-0;
	}

	.button-active {
		@apply bg-orange hover:bg-melon-800 focus:outline-none focus:ring-4 focus:ring-melon-300;
	}

	.button-disabled {
		@apply bg-stone-500 focus:outline-none focus:ring-4 focus:ring-stone-300;
	}
</style>
