<script lang="ts">
	import { userData } from '$lib/firebase';
</script>

{#if $userData?.role == 'admin'}
	<slot />
{/if}
