<script lang="ts">
  import HeaderSmall from './HeaderSmall.svelte';

	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import { db, user, userData } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	let loading = false;

	async function getUsername() {
		loading = true;

		const ref = doc(db, 'users', $user!.uid);
		const exists = await getDoc(ref);
	}
</script>

<AuthCheck>
	<div class="mx-auto flex flex-col h-screen">
		<HeaderSmall>Profile</HeaderSmall>
		<div class="flex flex-[1] min-h-0 w-full flex-col bg-almost-white">
			<div class="flex flex-col gap-2 overflow-auto hide-scroll h-full py-3 px-3" id="rounds">
				<div class="text-center">
					<div class="mx-auto w-24">
						<Avatar width={24} height={24} />
					</div>
					<a href="/" class="text-stone-500">Change photo</a>
				</div>
				<label for="name" class="font-bold">Name</label>
				<input
					type="name"
					name="name"
					id="name"
					placeholder="John Doe"
					value={$userData?.name}
					class="transition text-dark font-bold rounded-xl px-3 py-3 w-full grow-0 focus:border-orange focus:shadow-[0_0_3px_0_#f7550a] focus:outline-none border border-gray-100"
				/>
				<label for="email" class="font-bold">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					value={$user?.email}
					class="transition text-gray-300 rounded-xl px-3 py-3 w-full grow-0 border border-gray-100 bg-transparent"
					disabled
				/>
			</div>

			<div class="p-3"><Button>Save profile</Button></div>
		</div>
	</div>

	<MenuBottom />
</AuthCheck>

<style>
	.h-screen {
		height: calc(100vh - 4rem) !important;
	}
</style>
