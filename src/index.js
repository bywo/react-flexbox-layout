import hasFlexbox from './modernizr';

import makeHLayoutFlex from './horizontal';
import HLayoutItemFlex from './horizontal_item';
import makeVLayoutFlex from './vertical';
import VLayoutItemFlex from './vertical_item';

import makeHLayoutIE9 from './horizontal_ie9';
import HLayoutItemIE9 from './horizontal_item_ie9';
import makeVLayoutIE9 from './vertical_ie9';
import VLayoutItemIE9 from './vertical_item_ie9';


let makeHLayout, HLayoutItem, makeVLayout, VLayoutItem;

if (!hasFlexbox()) {
  makeHLayout = makeHLayoutIE9;
  HLayoutItem = HLayoutItemIE9;
  makeVLayout = makeVLayoutIE9;
  VLayoutItem = VLayoutItemIE9;
} else {
  makeHLayout = makeHLayoutFlex;
  HLayoutItem = HLayoutItemFlex;
  makeVLayout = makeVLayoutFlex;
  VLayoutItem = VLayoutItemFlex;
}

function createCustomClasses({
  defaultGutter = 0,
  gutterMultiplier = 1,
  defaultGutterUnit = 'px'
} = {}) {

  return {
    HLayout: makeHLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    HLayoutItem,
    VLayout: makeVLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    VLayoutItem
  };

}

let toExport = createCustomClasses();
toExport.createCustomClasses = createCustomClasses;

export default toExport;

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
.appLayoutGrowChildFlex { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }
.appLayoutGrowChildFlex > * { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; position: relative; }
.appLayoutGrowChildStatic > * { height: 100%; }
  `);
});
