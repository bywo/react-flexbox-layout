# react-flexbox-layout

Simple flexible layouts for IE9+.

## Rationale

UI developers often need to implement layouts that grow and shrink with the size of the container, or align elements with each other. Flexbox is a great solution to this, but it's only supported in newer browsers.

The most common use case is a series of elements laid out in a row or column with some spacing between them (which we'll call gutters). `react-flexbox-layout` makes this easy to achieve.

## How?

`react-flexbox-layout` components expose a subset of flexbox functionality.

For Chrome, Firefox, IE10+, and Safari, native flexbox is used. For IE9, a Javascript shim is used.

## Usage

```js

// Import the components with the default config
import { HLayout, HLayoutItem, VLayout, VLayoutItem } from 'react-flexbox-layout';

// Another way: Import the factory function to create the components with custom config
import { createCustomClasses } from 'react-flexbox-layout';

const { HLayout, HLayoutItem, VLayout, VLayoutItem } = createCustomClasses({
  defaultGutter: ...,
  gutterMultiplier: ...,
  defaultGutterUnit: ...,
  // wether to simulate flexbox behavior or not. In the browser it is automatically
  // set by detecting flexbox support. In the server is false by default and should
  // be set if supporting IE9, for example, by detecting the user agent.
  simulateFlexbox: ...
});
```

You should also include the `.css` file that this library provides, either by
just referencing in your html, or by importing it using `webpack` with `css-loader`
or any other bundler:

```html
<link rel="stylesheet" href="<path_to_react-flexbox-layout>/lib/styles.css" />
```

or, inside your JS:

```js
import { ... } from 'react-flexbox-layout';
import 'react-flexbox-layout/lib/styles.css';

...
```

## Concepts

* `HLayout`: short for horizontal layout. A series of elements laid out in a row.
* `VLayout`: short for vertical layout. A series of elements laid out in a column.
* `align`: vertical alignment, e.g., `top`, `middle`, `bottom`
* `justify`: horizontal alignment, e.g., `left`, `center`, `right`
* `flexGrow`: the relative amount to grow an element to take up available space
* `gutter`: the amount of spacing between consecutive elements. If consecutive elements specify a different gutter size for the gutter between them, the larger value is used.

## API

### `HLayout`
* `alignItems: (top|middle|baseline|bottom|stretch)`: how to vertically align children relative to this element.
* `justifyItems: (left|center|right)`: how to horizontally align children relative to this element. applies when no elements have `flexGrow`
* `gutter: number`: amount of spacing between child elements
* `gutterUnit: string`: e.g., `px`, `rem`
* `onLayout: func`: called after flexbox layout has been calculated (mainly used for IE9)
* `children: node(s)`: if you'd like to apply additional layout customization, use an `HLayoutItem` (see below)

### `HLayoutItem`
* `align: (top|middle|baseline|bottom|stretch)`: overrides parent `HLayout`s `alignItems`
* `flexGrow`: the relative amount to grow this element to take up available space
* `gutterLeft`: overrides parent `HLayout`s `gutter`
* `gutterRight`: overrides parent `HLayout`s `gutter`
* `children: node`: **MUST** be a single child

### `VLayout`
* `alignItems: (top|middle|bottom)`: how to vertically align children relative to this element. applies when no elements have `flexGrow`
* `justifyItems: (left|center|right|stretch)`: how to horizontally align children relative to this element.
* `gutter: number`: amount of spacing between child elements
* `gutterUnit: string`: e.g., `px`, `rem`
* `onLayout: func`: called after flexbox layout has been calculated (mainly used for IE9)
* `children: node(s)`: if you'd like to apply additional layout customization, use an `VLayoutItem` (see below)

### `VLayoutItem`
* `justify: (left|center|right|stretch)`: overrides parent `VLayout`s `justifyItems`
* `flexGrow`: the relative amount to grow this element to take up available space
* `gutterTop`: overrides parent `VLayout`s `gutter`
* `gutterBottom`: overrides parent `VLayout`s `gutter`
* `children: node`: **MUST** be a single child

### `requestNextLayoutMinDelay(n)`
Request that the next layout occur **at least** this `n` milliseconds from now. Only applies for IE9. Useful for debouncing layouts after rapidly occuring events like keypresses. See `/examples/debounce/app.jsx` for example usage.

## Gotchas

### `LayoutItem`s must have style: `box-sizing: border-box`.
The easiest way to do this is to define this CSS: `* { box-sizing: border-box }`
### Flexbox wrapping is not supported.
`LayoutItems` will simply overflow if they're too big. This is the CSS equivalent to `* { flex-wrap: nowrap }`
### Scroll position in IE9 is not preserved between layouts
The JS layout algorithm used in the IE9 shim needs to unset certain styles in order to measure the intrinsic heights of elements. This may cause your scrollable elements to lose their scroll position.

In cases where scroll position is being lost, you should manually save the scroll position before the calculation, and restore the scroll position afterwards.

```jsx
class MyScrollingContainer extends React.Component {
  componentWillUpdate() {
    this._scrollPos = ReactDOM.findDOMNode(this).scrollTop;
  }

  restoreScroll() {
    ReactDOM.findDOMNode(this).scrollTop = this._scrollPos;
  }

  render() {
    return (
      <VLayout onLayout={this.restoreScroll.bind(this)}>
        // lots of content
      </VLayout>
    )
  }
}
```
### Percentage widths
When `gutter`s are applied, dimensions won't add 100% because gutters add a non-percentage width. Use `flexGrow` to take up remaining space instead. e.g.
```jsx
// won't work. will overflow.
<HLayout gutter="10px">
  <HLayoutItem width="33%">a</HLayoutItem>
  <HLayoutItem width="33%">b</HLayoutItem>
  <HLayoutItem width="33%">c</HLayoutItem>
</HLayout>

// will work
<HLayout gutter="10px">
  <HLayoutItem flexGrow>a</HLayoutItem>
  <HLayoutItem flexGrow>b</HLayoutItem>
  <HLayoutItem flexGrow>c</HLayoutItem>
</HLayout>
```
### `height: 100%` doesn't work in flexbox
`react-flexbox-layout` automatically expands a *LayoutItem's* immediate child to fill the *LayoutItem's* height if applicable (i.e. `<HLayoutItem align="stretch">` or `<VLayoutItem flexGrow>`). However, grand-children aren't automatically expanded in this way, and the CSS magic to make that happen differs depending on browser. In order to make this happen, add the classname constant `EXPAND_CHILD`.

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

## Next steps

* Build out GitHub pages
* browser tests to ensure JS implementation matches native flexbox

## React 0.13 support

If you need to use React 0.13 please use the version 0.x.
Version 1.x or major DO NOT support React 0.13.
Master and version 1.x or greater only work with React 0.14 or greater.

## Contributing

* Install deps: `npm install`
* Run watcher: `npm run watch`
* Run examples server: `npm run examples`, `http://localhost:8080`
