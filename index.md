
## Chrome Experiment
### by **Philip Rideout**

This demonstrates high-performance 2D graphics using [giza](https://github.com/prideout/giza), a little WebGL library that I'm developing.  Click the center to generate a new random tree structure.

The antialiased silhouette is achieved in the fragment shader using the `OES_standard_derivatives` extension.

If you're wondering why I called this **monarchy**, I had planned for this to be a visualization of the royal family tree from William the Conqueror to Elizabeth II.  Other projects lured me away before I got very far!

You can see the code for this demo [on github](https://github.com/prideout/organic-animation).

By the way, if you shrink the window, the canvas attempts to maintain its aspect ratio using a responsive CSS pattern called **Basic Fluid Image** as described [here](http://bradfrost.github.io/this-is-responsive/patterns.html).