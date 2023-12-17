<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { auth, db, user } from '$lib/firebase';
	import { onMount } from 'svelte';
	import {
		sendSignInLinkToEmail,
		isSignInWithEmailLink,
		signInWithEmailLink,
		GoogleAuthProvider,
		signInWithPopup,
		signOut
	} from 'firebase/auth';

	import { goto } from '$app/navigation';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import type { User } from '$lib/models/user.model';

	let email = '';
	let emailSent = false;
	let message = '';
	let buttonText = 'Send sign in link';

	// async function signInWithGoogle() {
	// 	const provider = new GoogleAuthProvider();
	// 	const user = await signInWithPopup(auth, provider);
	// 	console.log(user);
	// }

	async function storeUser(uid: string, user: User) {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log('User data:', docSnap.data());
		} else {
			// docSnap.data() will be undefined in this case
			console.log('New user!');

			await setDoc(doc(db, 'users', uid), user);
		}
	}

	const buttonClick = async () => {
		const actionCodeSettings = {
			url: window.location.href,
			handleCodeInApp: true
		};

		try {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);

			window.localStorage.setItem('emailForSignIn', email);

			buttonText = 'Link sent';
			message = '';
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			// Handle the error...
		}
	};

	onMount(async () => {
		// Confirm the link is a sign-in with email link.
		if (isSignInWithEmailLink(auth, window.location.href)) {
			try {
				// Get the email if available. This should be available if the user completes
				// the flow on the same device where they started it.
				email = window.localStorage.getItem('emailForSignIn');

				// The client SDK will parse the code from the link for you.
				const result = await signInWithEmailLink(auth, email, window.location.href);

				// Clear email from storage.
				window.localStorage.removeItem('emailForSignIn');

				// You can access the new user via result.user
				// Additional user info profile not available via:
				// result.additionalUserInfo.profile == null
				// You can check if the user is new or existing:
				// result.additionalUserInfo.isNewUser

				console.log(result.user);

				// if (result.additionalUserInfo.isNewUser)
				const nameFromEmail = result.user.email?.split('@')[0] ?? '';
				storeUser(result.user.uid, {
					name: result.user.displayName ?? nameFromEmail,
					photoURL: result.user.photoURL ?? '/img/carl.jpg'
				});

				goto('/profile');
			} catch (error) {
				// Some error occurred, you can inspect the code: error.code
				// Common errors could be invalid email and invalid or expired OTPs.
				console.error(error);
			}
		}
	});
</script>

<div class="h-screen w-full bg-login bg-cover bg-top bg-no-repeat">
	<div class="w-full h-full p-3 bg-dark/70 flex flex-col gap-2">
		<h1 class="py-6 w-full">
			<img src="/img/logotype-light.png" alt="Hillclimb Casino" class="text-center" />
		</h1>

		<h2 class="text-2xl font-heading text-white text-center uppercase mt-[45%] mb-3">Sign in</h2>

		{#if $user}
			<h2 class="card-title">Welcome, {$user.email}</h2>
			<p class="text-center text-success">You are logged in</p>
			<!-- <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button> -->
		{:else}
			<label for="email" class="font-bold text-white">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="email@example.com"
				bind:value={email}
				class="transition text-dark font-bold rounded-xl text-sm px-5 py-4 w-full grow-0 focus:border-1 focus:border-orange focus:shadow-[0_0_3px_0_#f7550a] focus:outline-none"
			/>

			<Button on:click={buttonClick}>{buttonText}</Button>
		{/if}
	</div>
</div>
