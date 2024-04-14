(https://a4-jacobsilvester.glitch.me/
---

## Text Combiner Application V2
My website is very simple. I simply have two input boxes which take in any string. Upon clicking the "Combine!" button, the two strings are concatenated together with an added ' ' between them. The number of combined characters are then counted and logged as well. These two things, as well as the entry number, are then reported out in a table format.

I didn't change much between 2 and 3, only the login functionality was implemented. I however chose to remake A2 just for simplicity. I assumed using the local server would be easier.

For the purposes of this assignment, I definitely struggled both with timing but also understanding how React is used. In terms of the HTML, that didn't seem to be an issue. The webpage loads properly outside of a misaligned title, but that really wasn't too big of an issue for me. 

The trouble is that the functionality became a major roadblock. To be blunt there is no functionality, and this is where the time aspect comes into play. Using some debugging strategies, I can see that the issue is the communication between the client and server. For example, when the submit button is pressed, the error I receive is that /add isn't found in the server. And I'm not quite sure why that is.

My process in refactoring the app was to use function App(), put the functions I originally had in this new function, and then have it return the appropriate html for rendering. I know that the rendering must work, but the functions don't. I was operating under the assumption the server code wouldn't really be changed since React is for the front-end. 

Ultimately, I could clearly only achieve partial functionality, so I fully accept that the grade the project warrants is probably relatively low. I definitely can see why something like React could be beneficial to use. This could be a project I return to and try and solve when I have more time, or maybe try a different component.
)
