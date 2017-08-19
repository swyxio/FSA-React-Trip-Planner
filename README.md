# REACT TRIP PLANNER

An FSA student-led workshop by [@swyx](http://swyx.io)

The goal of this project is to familiarize FSA students with React by completely refactoring an old, familiar project to use React.

The Trip Planner is an ideal candidate to do this exercise because 1) it already uses webpack, 2) it already uses internal state, 3) it has components that need to talk to each other and also render app state.

Because React is purely a front-end framework, we will not need to touch any of the backend nor the CSS. We will only be editing the clientside javascript and to a lesser extent the base index.html.

We start with the official final solution to the Trip Planner - Live workshop, contained in the `tripplanner-live-STARTHERE` folder. We will end with a Reactified version, which is in the `react-tripplanner-live-ENDHERE` folder.

Shall we begin?

---
High level Table of Contents
=================

* [SECTION 0: SETUP](#section-0-setup) gets you from "no React" to "hello world".
* [SECTION A: PORTING THE HTML/USER INTERFACE](#section-a-porting-the-htmluser-interface) ports the user interface from old trip planner to react, but has none of the functionality
* [SECTION B: PORTING THE JAVASCRIPT](#section-b-porting-the-javascript) ports the javascript functionality from the old trip planner to react

---

Full Table of Contents
=================

   * [Steps to convert FSA Trip Planner-Live to React Trip Planner](#steps-to-convert-fsa-trip-planner-live-to-react-trip-planner)
      * [SECTION 0: SETUP](#section-0-setup)
         * [SETUP](#setup)
         * [CONFIGURE WEBPACK FOR REACT AND BABEL](#configure-webpack-for-react-and-babel)
         * [INSTALL REACT AND REACT-DOM](#install-react-and-react-dom)
      * [SECTION A: PORTING THE HTML/USER INTERFACE](#section-a-porting-the-htmluser-interface)
         * [MAIN COMPONENT](#main-component)
         * [NAVBAR COMPONENT](#navbar-component)
         * [MAP COMPONENT](#map-component)
         * [PANEL COMPONENT](#panel-component)
   * [IMPORTANT NOTE BEFORE SECTION B](#important-note-before-section-b)
      * [SECTION B: PORTING THE JAVASCRIPT](#section-b-porting-the-javascript)
         * [PANEL COMPONENT - SELECT](#panel-component---select)
         * [PANEL COMPONENT - BUTTONS AND BOTTOM PANEL](#panel-component---buttons-and-bottom-panel)
         * [BONUS: MAP COMPONENT - MARKERS](#bonus-map-component---markers)
   * [CONCLUSION](#conclusion)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

---

# Steps to convert FSA Trip Planner-Live to React Trip Planner

SECTION 0: SETUP
---

### SETUP

run these things to set up initially:

make sure you have postgres running with a database named `tripplanner`.

```
npm i
node server/seed
npm start
```

you should now have a normally running Trip Planner on `localhost:3000`

### CONFIGURE WEBPACK FOR REACT AND BABEL

Step 1: add the react loader to your webpack.config.js (under `rules`):
```
    {
        "exclude": "/node_modules/",
        "include":  __dirname + "/browser/",
        "loader": "babel-loader",
        "options": {
          "presets": ["es2015", "react"]
        },
        "test": /\.jsx?$/
      },
```
Note: FSA React Juke uses `loaders`, we are using `rules`. The two seem to be incompatible. i found this webpack solution [here](https://github.com/babel/babel-loader/issues/370)

Step 2: `npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react`

if you want, you can do `npm start` to doublecheck that nothing has changed.

### INSTALL REACT AND REACT-DOM

Step 1. `npm install --save react react-dom`

Step 2. Scaffold out our new frontend, we're not going to touch `client`: 

```
mkdir browser
touch browser/index.js browser/Main.js browser/Navbar.js browser/Map.js browser/Panel.js
``` 

Step 3. Fill out `browser/index.js` with basic React and ReactDom scaffolding:

```
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<h1>Hello world</h1>, document.getElementById('myApp'))
```

Step 4. Comment out `index.html` so that the `<body>` only has one `<div id='myApp'></div>`

Step 5. Switch the webpack entry point from `./client/index.js` to `./browser/index.js`

`npm start` to see your new clean React app!

SECTION A: PORTING THE HTML/USER INTERFACE
---

### MAIN COMPONENT

Fill out Main.js with the basic Component scaffold and initialize the state with empty arrays. Why do we need a separate Main.js from index.js? Honestly, we don't really. But we do want the top level thing to be able to store state, which we will find useful when we pass data from Panel to Main later on.

```
'use strict';

import React, {Component} from 'react'

export default class extends Component {
    constructor() {
        super()
        this.state = {
          hotels: [],
          restaurants: [],
          activities: []
        }
    }
    render() {
        return (<div>
                  <h1>Hello world</h1>
                </div>)
    }
}
```

You can then import Main.js into `index.js` and carry on.

### NAVBAR COMPONENT

Step 1. Fill out Navbar.js with the stuff you commented out in `index.html`. Remember to switch `class` to `className` when converting HTML to JSX.

Step 2. import Navbar into Main.js. Remember that component names have to start with a capital letter in React.

refresh and you should now see a navbar back again! Great, you can close Navbar.js and never worry about it again. Modularization for the win.

### MAP COMPONENT

Step 1. Port over the Maps html to Map.js and import Map to Main.js. elevate the `<div id="app" className="clearfix">` to Main.js as you will put the Panel as a sibling to Map

Step 2. Why is the map not rendering?? oh, right. it uses javascript. Port that over from the old `client/index.js`. Port just enough so that the map shows up, nothing more.

Hint: if you try to stick `mapboxgl.Map` into the `render()` function, you get an error because `map-canvas` doesn't yet exist on first render. What is [a good lifecycle hook](https://facebook.github.io/react/docs/react-component.html) to use to call javascript only AFTER a component has rendered?

### PANEL COMPONENT

Step 1. Port over the Panel html to Panel.js and import Panel to Main.js (as a sibling component to Map, as mentioned above).

You should at this point have a fully recreated UI of Trip Planner done in React, but none of the functionality works yet!

# IMPORTANT NOTE BEFORE SECTION B

Do not get trapped into trying to copy+paste from the old javascript into your new React code. the old javascript relied on updating `state` and creating and destroying DOM components every change you made. In React, `this.state` simply contains your current data state, `render()` renders your JSX according to the data in `this.state`, and the only way you trigger a re-render is by calling `this.setState()` which then calls `render()` again based on your new state. This is called "one way data flow" - you NEVER, EVER, directly manipulate `this.state` anywhere in your code except in the constructor. Repeating for emphasis: you 

**NEVER**, 

**EVER**, 

directly manipulate `this.state` anywhere in your code outside the constructor.


You only update state with `this.setState`, which allows you to get the benefits of re-rendering and DOM-diffing that you would otherwise have to program manually like you did in the old javascript.


SECTION B: PORTING THE JAVASCRIPT
---

### PANEL COMPONENT - SELECT

Step 1. Copy over `attractions.js` from `/client/` to `/browser/`, we will simply reuse it

Step 2. use `attractions.js` in Panel.js to populate your JSX `select` tags with an array of javascript-generated `option`s.

Hint: How do you embed {JSX generated via javascript} inside JSX?

Hint: If you are generating an array of JSX, what property do you need to assign each element of the array so that React works properly? (you get a warning in console if you don't do this)

Hint: As soon as you see the pattern, refactor the javascript generator code to a `makeOptions` function that you then call dynamically, eg `{makeOptions('hotels')}`, `{makeOptions('restaurants')}`, etc.

You should now have a Panel that loads the full list of Hotels, Restaurants, and Activities.

But the buttons don't work yet!

### PANEL COMPONENT - BUTTONS AND BOTTOM PANEL

Let's make this clear, we could make the buttons work (adding whatever is selected to the bottom panel) very easily within Panel.js by adding a few fields to `this.state`.

But we are not going to do that.

Why?

The info that the buttons generate need to be reflected in the bottom panel AND in the Map component!

The Map component is a sibling of the Panel component. How do you pass data from a sibling to a sibling?

You put the `state` at their parent (Main) and then pass the `state` (and eventHandlers that manipulate the `state`) down to its kids as props!

Step 1. in Main.js, write two event handler functions, `addFunc` and `delFunc`, that will `setState` based on parameters you pass: add to `this.state[attractionType]`, and remove from `this.state[attractionType]`

REMINDER: Sparkly fairies die every time you try to set `this.state` directly.

Hint: you can clone objects like `this.state` easily with `Object.assign({}, this.state)`

Hint: Don't forget to `.bind(this)` in the constructor, on functions that you are going to pass on down.

Extra hint: addFunc pseudocode:
```
    addFunc(attractionType) {
      // get the selectedId from the DOM element corresponding to attractionType
      // retrieve the corresponding selectedAttraction data from `attractions.find()`
      // clone this.state into a new object so that you can modify it
      // modify your cloned object with selectedAttraction
      // setState with the modified cloned object
    }
```
Extra hint: delFunc pseudocode:
```
    delFunc(attractionType, id) {
      // clone this.state into a new object so that you can modify it
      // filter out anything that has the target id from the new object[attractionType]
      // setState with the modified cloned object
    }
```

Step 2. Time to use React Component `props`! pass `this.state` and both functions down to `Panel`.

Hint: if your component needs to use its props, you need to declare it in `constructor(props)` and then take it down in `super(props)`. Don't ask me why.

Step 3. In Panel.js, Wire up your `addFunc` to a button's `onClick` attribute via an anonymous function. 

Hint: why does `onClick` require a function that calls `addFunc` instead of simply `addFunc`? What happens when you just give it `addFunc`?

Step 4. In Panel.js, add a generator function `makeLi` to make the list items for each section in the bottom panel (just like `makeOptions`).

Hint: don't forget to add `className="itinerary-item"` to the `li` and `className="btn btn-xs btn-danger remove btn-circle"` to the delete `button`

Whoo! that was a lot of work! You should now be able to add things to the bottom panel by clicking the corresponding buttons! 

It's mostly Downhill from here. Let's make the delete button work!

Step 5. In Panel.js, wire up `delFunc` to the delete `button` of each `li`. Remember `delFunc` takes an `attractionType` and a place `id`.

Great, now you can add and delete stuff! only the map markers left!

### BONUS: MAP COMPONENT - MARKERS

Ok I lied a bit above (this is what happens when you write tutorials at 3am in the morning). You are not passing data down from Main to Map. instead, you are passing a reference to the `map` UP to its parent!!! Whaaaa?

This part is a bit tricky and not yet covered in the Juke React workshop, but is probably really good to know. Read about `ref`s here! <https://facebook.github.io/react/docs/refs-and-the-dom.html>

Step 1. in `Map.js`, you only need to do one modification: instead of assigning your `new mapboxgl.Map` to a variable called `map`, attach it to the component with `this.map`. Now a parent component can access it with refs!

Step 2. copy and `require("./marker")` into the `client` folder

Step 3. in Main.js, declare `buildMarker` as `require("./marker")`

Step 4. to retrieve the `ref` you attached to your Map object, pass it a callback function that assigns its `map` variable to your `map` variable. When initially rendering, `Map` can be null so be sure to handle that:

```
<Map ref={(x) => !x ? '' : this.map = x.map}/>
```

Step 5. Phew. now you can proceed. in `addFunc`, 

1. build the marker, 
2. addTo(`this.map`) which you just assigned in the callback function in the previous step, 
3. attach your new marker to the selectedAttraction object so that you can call `.remove()` on it later
4. add `this.map.flyTo` at the end

Your map now adds markers and flies to it when you select places!

Step 6. Now to delete. because we were careful in step 5, deleting simply requires you to call `.remove()` the attached marker to the attraction being deleted while you are filtering in `delFunc`.

# CONCLUSION

You have now completely refactored the trip planner app to use React. This new architecture is:

- modular (Main.js is able to treat Navbar, Map, and Panel as abstract components and only focus on coordinating state)
- scalable (you can arbitrarily add state variables - which are the basic building blocks behind features) and not worry about manipulating the DOM, because you are not storing state in the DOM)
- concise (writing JSX to build out your data-dependent HTML, instead of calling `document.createElement`. Removing JSX elements is literally as easy as removing from this.state)
- high confidence (because the DOM always reflects the internal data state, there is a much lower chance of edge cases and bugs where internal state is "desynced" from the external-facing DOM)

thanks for trying this tutorial. If you liked it, please share it around; if you didn't, I would love your feedback.
