Assignment 4 - Components
===
---
## Your Web Application Title

Hosting Link: http://a4-briannasahagian.glitch.me/

For this project, I re-implemented my A2 assignment using the Svelte framework. The largest things I changed were the client-side implementation of the application and the switch to an express app with a ViteExpress server. For the server.js file, I reformatted my requests using app.get/app.post routines and served my static files with express.static. For my client-side Svelte implementation, I transformed my logic into the App.svelte format. I got to explore new ways to handle promises: `{#await promise then appdata}`, trigger onclick functions: `<button on:click = "{removeMaterial}"></button>`, and populate my index.html file using an app div.

**Note**: Sometimes it is necessary to reload the page to get rid of a 'GET /' error, but everytime I've encountered this error with the site, I am able to navigate to the correct page after reloading. I am interested in why this is happening, if you have any insights.

The new technology definitely improved the development experience UNTIL it was time to host the application on Glitch. The switch to the App.svelte formatting was quite simple to pick up and the general request/response handling felt more straightforward than the async functions that we dealt with in A2, especially when receiving the appdata. Unfortunately, I ran into many issues with Glitch clashing with Svelte modules/file organization when trying to host my application. I was eventually able to figure out the hosting process for the Svelte framework on Glitch after initial failed attempts with Glitch, Render, and Vercel.