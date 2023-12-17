<script lang="ts">
	import { user } from '$lib/firebase';
	import Button from './Button.svelte';
</script>

{#if $user}
	<slot />
{:else}
	<div class="p-3 flex flex-col gap-3">
		<p class="font-bold">You must be signed in to view this page</p>
		<a href="/login"><Button>Sign in</Button></a>
	</div>
{/if}
