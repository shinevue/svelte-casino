<script lang="ts">
	import HeaderSmall from '../../lib/components/HeaderSmall.svelte';

	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import MenuBottom from '$lib/components/MenuBottom.svelte';
	import { db, storage, user, userData } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let nameSaved: boolean | null = null;
	let previewURL: string;
	let uploading = false;
	let photoUploaded: boolean | null = null;
	let debounceTimer: NodeJS.Timeout;
	async function onNameChange(e: any) {
		nameSaved = false;
		const name = e.target.value;
		clearTimeout(debounceTimer);

		if (name.length > 1) {
			debounceTimer = setTimeout(async () => {
				await updateDoc(doc(db, 'users', $user!.uid), { name: name });

				nameSaved = true;
			}, 500);
		}
	}

	async function upload(e: any) {
		uploading = true;
		photoUploaded = false;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$user!.uid}/profile.jpg`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url });
		uploading = false;
		photoUploaded = true;
		setTimeout(() => {
			photoUploaded = null;
		}, 3000);
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
							class:saturate-0={uploading}
						/>

						{#if photoUploaded}
							<p class="pt-2 inline-flex items-center fade-in">
								Uploaded
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										data-slot="icon"
										class="ml-1 w-5 h-5 fill-orange"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
											clip-rule="evenodd"
										/>
									</svg></span
								>
							</p>
						{:else if uploading}
							<p class="pt-2" class:animate-pulse={uploading} class:text-orange={uploading}>
								Uploading...
							</p>
						{:else}
							<p class="pt-2">Change photo</p>
						{/if}
						<!-- <p class="pt-2" class:animate-pulse={uploading} class:text-orange={uploading}>
							{uploading ? 'Uploading...' : 'Change photo'}
						</p> -->

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

				<div class="relative">
					{#if nameSaved}
						<div class="absolute end-0 flex items-center pe-3.5 pointer-events-none h-full fade-in">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								class="w-5 h-5 fill-orange"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					{/if}
					<input
						type="name"
						name="name"
						id="name"
						placeholder="John Doe"
						on:input={onNameChange}
						value={$userData?.name}
						class="transition text-dark font-bold rounded-xl px-3 py-3 w-full grow-0 focus:border-orange focus:shadow-[0_0_3px_0_#f7550a] focus:outline-none border border-gray-100"
					/>
				</div>

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

			<!-- <div class="p-3"><Button>Save profile</Button></div> -->
		</AuthCheck>
	</div>
</div>

<MenuBottom />

<style>
	.h-screen {
		height: calc(100vh - 4rem) !important;
	}
</style>
