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

# Troubleshooting

## My child element won't fill a *LayoutItem's height when I set CSS `height: 100%`

`height: 100%` doesn't work in flex-box land.

`react-flexbox-layout` automatically expands a *LayoutItem's immediate child to fill the *LayoutItem's height if applicable (i.e. `<HLayoutItem align="stretch">` or `<VLayoutItem flexGrow>`). However, grand-children aren't automatically expanded in this way, and the CSS magic to make that happen differs depending on browser. In order to make this happen, add the classname constant `EXPAND_CHILD`.

```jsx
// before
<HLayoutItem align="stretch">
  <div> // child auto-expands.
    <div> // grandchild doesn't auto-expand.
      content is small
    </div>
  </div>
</HLayoutItem>

// after
import {EXPAND_CHILD} from `react-flexbox-layout`;
<HLayoutItem align="stretch">
  <div className={EXPAND_CHILD}> // child auto-expands.
    <div> // grandchild auto-expands!
      content is big
    </div>
  </div>
</HLayoutItem>
```

# Contributing

* Install deps: `npm install`
* Run watcher: `npm run watch`
