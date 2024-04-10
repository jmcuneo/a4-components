# Recipe Cookbook

Link: https://a4-ellysgorodisch.onrender.com/

*Note: May take a long time to load*

Include a very brief summary of your project here and what you changed / added to assignment #3. Briefly (3–4 sentences) answer the following question: did the new technology improve or hinder the development experience?

Unlike previous assignments, this assignment will be solely graded on whether or not you successfully complete it. Partial credit will be generously given.

## Changes

### Server
- Changed server to use ViteExpress along with Express
- Had to change all `require` lines to `import`s
- Had to change how createTable sent data to the client

### Client
- Had to move and edit recipes.html to fit in App.svelte
- Had to move and edit all functions from main.js to App.svelte to conform with how Svelte handles button presses
- Had to change on-click function formatting for buttons
- Had to change how table is rendered in App.svelte to match Svelte's reactive programming
- Had to edit css files slightly to address new nesting of HTML elements

### New Technology

*Did the new technology improve or hinder the development experience?*

Using the new technology both helped and hindered my development experience. Vite was quite useful as it automatically updated my site without having to do anything. Unfortunately, I had a lot of trouble getting my site on a hosting service. I was unfamiliar with how building worked with Vite and Svelete and how the file directory was supposed to look.