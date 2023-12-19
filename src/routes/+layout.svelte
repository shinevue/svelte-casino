<script lang="ts">
	import { user, userData } from '$lib/firebase';
	import '../app.css';
	// PWA
	import { pwaInfo } from 'virtual:pwa-info';
	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	$user;
	$userData;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&family=Noto+Color+Emoji&family=Poppins:ital,wght@1,800&display=swap"
		rel="stylesheet"
	/>

	{@html webManifest}
</svelte:head>

<div class="">
	<slot />
</div>
