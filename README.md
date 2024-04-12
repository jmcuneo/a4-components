## CS4241 Assignment 4
Lucas Sicard

This site is meant to record monthly bills that you enter into it. It allows for updating, removing, & adding entries. I 
tried to add react using the way I knew how with create-react-app, but I did not end up being able to run the server.js 
& the index.tsx simultaneously without doing more to the project. I needed the server.js still because of the connection 
with MongoDB. Probably, with a bit more time & a separated back & front end, I could build it properly. Unfortunately, I 
ran out of time & this is all I have so far. Kind of funny as this is something I've done several times now with different 
websites, using React & Typescript to build a web app, but nonetheless I still did not successfully upload this to Glitch.

If I were to continue these are the things I would do:
* Build the app using Vite, React, & Typescript (code should mostly be the same, just a different setup)
* From there, it seems that vite-express can run both the backend & frontend at the same time by using the server.js to 
serve the frontend files.
  * If not, I could possibly use another free service to run the server.js file & just use axios to make queries.
* Then, make sure Login.tsx & Home.tsx buttons & queries work properly
* Restyle it, probably using styled-components, & could use React-Bootstrap instead of just Bootstrap
* Remove unnecessary files & then upload to Glitch
