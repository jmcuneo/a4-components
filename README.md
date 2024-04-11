## BoxFort: React Edition

https://a4-patrick-hunter.glitch.me/

This assignment is essentially a port of A3 to React. A few changes were made, which include changing the OAuth to a separate app and adding a thread "lock" to the add_box function.

Some technologies improved the development experience, while others didn't. Converting the project to React was a simple, straightforward process that substantially reduced the amount of code needed. However, trying to bundle the project was a hassle. I only converted one page to react, so I had to figure out how to bundle only the React content and leave the other page alone. ViteExpress did not bundle the clientside code, and with a lack of documentation I explored alternatives such as Webpack. Webpack was also too bothersome to use, so I searched around more and found esbuild, which bundles the entire project into one .js file. Esbuild was good enough for me, it does not automatically bundle the project but I can assume that it would take more time to get Vite/Webpack working than to use Esbuild.