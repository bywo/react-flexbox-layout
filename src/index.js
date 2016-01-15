// Disable until we learn how to do properly server side rendering support.
// import hasFlexbox from './modernizr';

import makeHLayoutFlex from './horizontal';
import HLayoutItemFlex from './horizontal_item';
import makeVLayoutFlex from './vertical';
import VLayoutItemFlex from './vertical_item';

// import makeHLayoutIE9 from './horizontal_ie9';
// import HLayoutItemIE9 from './horizontal_item_ie9';
// import makeVLayoutIE9 from './vertical_ie9';
// import VLayoutItemIE9 from './vertical_item_ie9';
//
// import {requestNextLayoutMinDelay} from './update_engine_ie9';


let makeHLayout, HLayoutItem, makeVLayout, VLayoutItem;

// don't use compatibility mode if we're in tests, since it'll slow tests down
// with unnecessary DOM calculations
const env = process.env.NODE_ENV;
const isTesting = env === 'test' || env === 'testing';

// if (!hasFlexbox() && !isTesting) {
//   makeHLayout = makeHLayoutIE9;
//   HLayoutItem = HLayoutItemIE9;
//   makeVLayout = makeVLayoutIE9;
//   VLayoutItem = VLayoutItemIE9;
// } else {
makeHLayout = makeHLayoutFlex;
HLayoutItem = HLayoutItemFlex;
makeVLayout = makeVLayoutFlex;
VLayoutItem = VLayoutItemFlex;
// }

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

toExport.EXPAND_CHILD = 'reactFlexboxLayoutExpandChild';

// toExport.requestNextLayoutMinDelay = requestNextLayoutMinDelay;

export default toExport;


// TODO: move into util
function addStyleString(str) {
  if (typeof document === "undefined") return;

  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
}

const flexGrowParentRules = '{ display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; }';
const flexGrowChildRules = '{ -webkit-box-flex: 1 0 auto; -webkit-flex: 1 0 auto; -ms-flex: 1 0 auto; flex: 1 0 auto; position: relative;}';

const staticGrowChildRules = '{ display: block !important; width: 100%; height: 100%; }';

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function() {
    addStyleString(`
      .appLayoutGrowChildFlex ${flexGrowParentRules}
      .appLayoutGrowChildFlex > * ${flexGrowChildRules}

      .appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} ${flexGrowParentRules}
      .appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > * ${flexGrowChildRules}

      .appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} ${flexGrowParentRules}
      .appLayoutGrowChildFlex > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} > * ${flexGrowChildRules}


      .appLayoutGrowChildStatic > * ${staticGrowChildRules}

      .appLayoutGrowChildStatic > .${toExport.EXPAND_CHILD} > * ${staticGrowChildRules}

      .appLayoutGrowChildStatic > .${toExport.EXPAND_CHILD} > .${toExport.EXPAND_CHILD} > * ${staticGrowChildRules}

      .appLayoutVendoredFlex {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
      `);
    });
}
