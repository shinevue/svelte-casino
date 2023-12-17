import { derived, writable, type Readable } from 'svelte/store';
// Create a store and update it when necessary...
const countdown = writable();
countdown.set(0);

export let roundActive = true;
export let timer = null;

timer = setInterval(() => {
	countdown -= 1;
	if (countdown <= 0) {
		// Countdown finished
		countdown = 0;
		roundActive = false;
	}
}, 1000);
