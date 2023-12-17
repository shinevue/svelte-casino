<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error text-white text-center">
		You must be signed in to view this page.
		<a class="bg-orange text-white font-bold" href="/login">Sign in</a>
	</p>
{/if}
