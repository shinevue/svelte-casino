<script lang="ts">
	import { goto } from '$app/navigation';
	import 'flowbite';
	const gotoRoute = (event: any) => {
		const route = `/${event.target.dataset.page}`;
		goto(route);
	};
</script>

<div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-stone-200">
	<div class="grid h-full max-w-lg grid-cols-3 mx-auto font-bold tracking-wider">
		<button
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-stone-50 group"
			data-page="bet"
			on:click={gotoRoute}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 mb-1 text-stone-500 group-hover:text-melon-600"
				data-page="bet"
			>
				<path
					fill-rule="evenodd"
					d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
					clip-rule="evenodd"
					data-page="bet"
				/>
			</svg>

			<span class="text-sm text-stone-500 group-hover:text-melon-600" data-page="bet">Bet</span>
		</button>
		<button
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-stone-50 group"
			data-page="leaderboard"
			on:click={gotoRoute}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 mb-1 text-stone-500 group-hover:text-melon-600"
				data-page="leaderboard"
			>
				<path
					fill-rule="evenodd"
					d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
					clip-rule="evenodd"
					data-page="leaderboard"
				/>
			</svg>

			<span class="text-sm text-stone-500 group-hover:text-melon-600" data-page="leaderboard"
				>Leaderboard</span
			>
		</button>

		<button
			type="button"
			class="inline-flex flex-col items-center justify-center px-5 hover:bg-stone-50 group"
			on:click={gotoRoute}
			data-page="profile"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 mb-1 text-stone-500 group-hover:text-melon-600"
				data-page="profile"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
					clip-rule="evenodd"
					data-page="profile"
				/>
			</svg>

			<span class="text-sm text-stone-500 group-hover:text-melon-600" data-page="profile"
				>Profile</span
			>
		</button>
	</div>
</div>
