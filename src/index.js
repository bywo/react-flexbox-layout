import isIE9 from 'app/views/util/is_ie9';

import Container from './container';

import HLayoutFlex from './horizontal';
import HLayoutItemFlex from './horizontal_item';
import VLayoutFlex from './vertical';
import VLayoutItemFlex from './vertical_item';

import HLayoutIE9 from './horizontal_ie9';
import HLayoutItemIE9 from './horizontal_item_ie9';
import VLayoutIE9 from './vertical_ie9';
import VLayoutItemIE9 from './vertical_item_ie9';


let HLayout, HLayoutItem, VLayout, VLayoutItem;

if (isIE9()) {
  HLayout = HLayoutIE9;
  HLayoutItem = HLayoutItemIE9;
  VLayout = VLayoutIE9;
  VLayoutItem = VLayoutItemIE9;
} else {
  HLayout = HLayoutFlex;
  HLayoutItem = HLayoutItemFlex;
  VLayout = VLayoutFlex;
  VLayoutItem = VLayoutItemFlex;
}

// Export both for convenience for our style guide, since we wanna explicitly
// see on other browser how the IE9 layout is working.
export {
  HLayout,
  HLayoutItem,
  VLayout,
  VLayoutItem,

  HLayoutIE9,
  HLayoutItemIE9,
  VLayoutIE9,
  VLayoutItemIE9
};


// TODO: move into util
function addStyleString(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
}

// TODO: move into shared file
document.addEventListener("DOMContentLoaded", function() {
  addStyleString(`
.appLayoutGrowChildAbsolute { position: relative; }
.appLayoutGrowChildAbsolute > * { position: absolute; width: 100%; height: 100%; }
.appLayoutGrowChildFlex { display: flex; }
.appLayoutGrowChildFlex > * { flex: 1; position: relative; }
.appLayoutGrowChildStatic > * { height: 100%; }
  `);
});
