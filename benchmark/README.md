
This naive benchmark is used to get a feel of the general performances of `kaiju` and watch out for regressions when adding/updating features.  
The reference is `React` version 15.

On a powerful OSX laptop, using Chrome or FF (they give close numbers):


| Measure       |  kaiju        | React |
| ------------- |:-------------:| -----:|
| Minified bundle size | 14.7kb | 145kb |
| First render script execution | 15ms  | 70ms


Notes:

* Minified bundle size  
This is disadvantageous to React, as there is almost no application code while React is a big lib.
Still, every little saved kilobytes helps the network for the first render.

* First render script execution  
This is the time taken by each to compile, execute their own framework and first-render code.
React also have bigger GC pauses, visible in the timeline.
Unsurprisingly, both libs end up giving almost exactly the same amount of work to the browser (DOM parsing, layout, paint)

* Why are updates not benchmarked?  
kaiju initially renders the app synchronously but then renders updates inside requestAnimationFrame, so I would have to fork the framework to measure it and do a fair comparison (React renders ~synchronously)
I suspect kaiju would do quite well, since like React, it can do isolated component diffing.  
Also, unlike in React, if a kaiju component is being removed from the screen with an animation, it is guaranteed it won't re-render (An absolute animation performance killer).
