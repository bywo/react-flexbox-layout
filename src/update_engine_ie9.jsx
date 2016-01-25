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

/**
 * update synchronously updates all registered Layout components
 */
export function update() {
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

  _.invoke(components, '_callDidLayout');
}

/**
 * requestAsyncUpdate guarantees that `update` will be run sometime in the future
 */
export const requestAsyncUpdate = _.debounce(updateAfterDelay, 0);

export function updateOnWindowResize() {
  window.addEventListener('resize', _.debounce(requestAsyncUpdate, 16));
}

var nextDelay = 0;
/**
 * Request that the next re-layout be at least @delay ms from now.
 * @param  {Number} delay
 */
export function requestNextLayoutMinDelay(delay) {
  nextDelay = Math.max(nextDelay, delay);
}

var delayedUpdate,
    delayedUpdateTime;
function updateAfterDelay() {
  if (nextDelay === 0 && !delayedUpdate) {
    update();
    return;
  }

  var potentialUpdateTime = Date.now() + nextDelay;

  if (!delayedUpdate || potentialUpdateTime > delayedUpdateTime) {
    clearTimeout(delayedUpdate);
    delayedUpdateTime = potentialUpdateTime;
    delayedUpdate = setTimeout(performDelayedUpdate, nextDelay);
  }

  nextDelay = 0;
}

function performDelayedUpdate() {
  delayedUpdate = null;
  update();
}
