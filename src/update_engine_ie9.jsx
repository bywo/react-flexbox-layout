import _ from 'lodash';

/**
 * UpdateEngineIE9
 *
 * Singleton that handles updating *LayoutIE9 components outside of the React's update flow
 */

// array of mounted *LayoutiE9 components
// invariant: parent Layout components will have lower index than child Layout components
let components = [];

/**
 * register registers a Layout component with the UpdateEngine
 * @param  {LayoutComponent} component
 */
export function register(component) {
  if (!_.contains(components, component)) {
    components.push(component);
  }
}

/**
 * deregister removes a Layout component from the UpdateEngine
 * @param  {LayoutComponent} component
 */
export function deregister(component) {
  const i = components.indexOf(component);
  if (i !== -1) {
    components.splice(i, 1);
  }
}

var scrolledElements = [];
function saveScrollPositions() {
  var els = document.getElementsByTagName('*');
  var el,
      len = els.length,
      scrollLeft, scrollTop;

  for (var i = 0; i < len; i++) {
    el = els[i];

    scrollLeft = el.scrollLeft;
    scrollTop = el.scrollTop;

    if (scrollLeft > 0 || scrollTop > 0) {
      scrolledElements.push({el, scrollLeft, scrollTop});
    }
  }
}

function restoreScrollPositions() {
  var len = scrolledElements.length;

  for (var i = 0; i < len; i++) {
    let position = scrolledElements[i];
    let {el, scrollLeft, scrollTop} = position;

    if (scrollLeft > 0) {
      el.scrollLeft = scrollLeft;
    }
    if (scrollTop > 0) {
      el.scrollTop = scrollTop;
    }
  }

  if (len > 0) {
    scrolledElements = [];
  }
}

/**
 * update synchronously updates all registered Layout components
 */
export function update() {
  // before we start, save scroll positions because unsetting layout styles may mess up scrolling
  saveScrollPositions();

  // first unset all styles, since existing styles will mess with measurements
  _.invoke(components, '_unsetLayoutStyles');

  // NOTE: batch measurements and style application as much as possible to prevent excessive reflows

  // apply widths first because heights are dependent on widths (e.g., text wrap), but not the other way around
  _.invoke(components, '_measureInheritedStyles');
  _.invoke(components, '_measureWidths');

  _.invoke(components, '_applyInheritedStyles');
  _.invoke(components, '_applyWidths');

  // apply heights now that widths have been set
  _.invoke(components, '_measureItemHeights');
  _.invoke(components, '_applyFlexHeights');

  // NOTE: each container must be set sequentially instead of batched because child Layout heights can depend on
  // parent Layout heights (e.g., child is vertical flexGrow on parent). In-order traversal of array works because of the
  // invariant described above: parent Layout components will have lower index than child Layout components.
  _.invoke(components, '_setContainerHeights');

  // now restore prev scroll positions
  restoreScrollPositions();

  _.invoke(components, '_callDidLayout');
}

/**
 * requestAsyncUpdate guarantees that `update` will be run sometime in the future
 */
export const requestAsyncUpdate = _.debounce(update, 50);

// update on window resize
window.addEventListener('resize', requestAsyncUpdate);
