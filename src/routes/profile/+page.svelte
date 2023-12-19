<script lang="ts">
	import HeaderSmall from '../../lib/components/HeaderSmall.svelte';

	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import { db, storage, user, userData } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let saving = false;
	let previewURL: string;
	let uploading = false;
	let debounceTimer: NodeJS.Timeout;
	async function onNameChange(e: any) {
		const name = e.target.value;
		clearTimeout(debounceTimer);
		saving = true;
		debounceTimer = setTimeout(async () => {
			await updateDoc(doc(db, 'users', $user!.uid), { name: name });

			saving = false;
		}, 500);
	}

	async function upload(e: any) {
		uploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$user!.uid}/profile.jpg`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url });
		uploading = false;
	}
</script>

<div class="mx-auto flex flex-col h-screen">
	<HeaderSmall>Profile</HeaderSmall>
	<div class="flex flex-[1] min-h-0 w-full flex-col bg-almost-white">
		<AuthCheck>
			<div class="flex flex-col gap-2 overflow-auto hide-scroll h-full pb-3 px-3">
				<div class="text-center">
					<label for="photo-url" class="text-stone-500 p-3 block w-fit mx-auto cursor-pointer">
						<img
							src={previewURL ?? $userData?.photoURL ?? '/img/carl.jpg'}
							alt=""
							class="w-24 h-24 avatar mx-auto"
						/>

						<p class="pt-2">{uploading ? 'Uploading...' : 'Change photo'}</p>
						<input
							on:change={upload}
							id="photo-url"
							name="photoURL"
							type="file"
							class="hidden"
							accept="image/png, image/jpeg, image/gif, image/webp"
						/>
					</label>
				</div>
				<label for="name" class="font-bold">Name</label>
				<input
					type="name"
					name="name"
					id="name"
					placeholder="John Doe"
					on:change={onNameChange}
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
		</AuthCheck>
	</div>
</div>

<MenuBottom />

<style>
	.h-screen {
		height: calc(100vh - 4rem) !important;
	}
</style>
