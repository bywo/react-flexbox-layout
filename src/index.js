// Check if we have a DOM, to support server side rendering
const hasFlexbox = typeof document !== 'undefined' ?
  require('./modernizr') :
  () => true;

// don't use compatibility mode if we're in tests, since it'll slow tests down
// with unnecessary DOM calculations
const env = process.env.NODE_ENV;
const isTesting = env === 'test' || env === 'testing';

import {requestNextLayoutMinDelay} from './update_engine_ie9';

function createCustomClasses({
  defaultGutter = 0,
  gutterMultiplier = 1,
  defaultGutterUnit = 'px',
  simulateFlexbox = !hasFlexbox() && !isTesting
} = {}) {

  let makeHLayout, HLayoutItem, makeVLayout, VLayoutItem;

  if (simulateFlexbox) {
    makeHLayout = require('./horizontal_ie9');
    HLayoutItem = require('./horizontal_item_ie9');
    makeVLayout = require('./vertical_ie9');
    VLayoutItem = require('./vertical_item_ie9');
  } else {
    makeHLayout = require('./horizontal');
    HLayoutItem = require('./horizontal_item');
    makeVLayout = require('./vertical');
    VLayoutItem = require('./vertical_item');
  }

  return {
    HLayout: makeHLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    HLayoutItem,
    VLayout: makeVLayout(defaultGutter, gutterMultiplier, defaultGutterUnit),
    VLayoutItem
  };

}

let toExport = createCustomClasses();
toExport.createCustomClasses = createCustomClasses;

toExport.EXPAND_CHILD = 'rflExpandChild';

toExport.requestNextLayoutMinDelay = requestNextLayoutMinDelay;

export default toExport;
