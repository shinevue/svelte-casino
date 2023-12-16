# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Deploy on Mac M1 (using Docker)
1. `docker run --rm -it --platform linux/amd64 node:20 bash`
2. `git config --global user.name "John Doe"`
3. `git config --global user.email "EMAIL"`
4. `git clone REPO`
5. `cd REPO`
6. `npm install`
7. `npm i -g firebase-tools`
8. `firebase login --no-localhost`
9. `firebase experiments:enable webframeworks`
10. `firebase init hosting`
11. `git add firebase.json .firebaserc`
12. `git commit -m "Add firebase deploy"`
13. `git push`
14. `firebase deploy`
