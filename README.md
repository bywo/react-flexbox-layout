# react-flexbox-layout
Simple flexible layouts for IE9+

## Assumptions

* `* { box-sizing: box-sizing }`
* Horizontal layout items adding to 100%, due to margins you can't add items suming up to 100% (expand on this)

## Set up

* Run examples server: `npm run examples`, `http://localhost:8080`

# Next steps

* add webpack config to be able to build it and compile it (see what stuff is not working and solve any building errors)
* build an example page and make it work with the current impl
* migrate the api to be able to use px or rems
* react-style? move it out? should not be used inside the render neither.
* make the gutters configuration be part of the settings of the component
* tests?

# Contributing

* Install deps: `npm install`
* Run watcher: `npm run watch`
