<script lang="ts">
	const defaultPhotoUrl = 'img/carl.jpg';
	export let photoURL: string = defaultPhotoUrl;
	export let alt: string = 'Avatar';
	export let width: number = 14;
	export let height: number = 14;
	const classList = `w-${width} h-${height} p-0.5 rounded-full ring-1 ring-gray-300 object-cover`;

	let imageSource = photoURL || defaultPhotoUrl;

	function handleImageError() {
		imageSource = defaultPhotoUrl;
	}
</script>

<img class={classList} src={imageSource} {alt} on:error={handleImageError} />
