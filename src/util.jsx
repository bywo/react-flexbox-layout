import _ from "lodash";
import React from "react";

export function mapNonEmpty(children, fn) {
  let offset = 0;
  return React.Children.map(children, function(child, index) {
    if (!child) {
      offset += 1;
      return child;
    }

    return fn(child, index - offset);
  });
}

export function forEachNonEmpty(children, fn) {
  let offset = 0;
  React.Children.forEach(children, function(child, index) {
    if (!child) {
      offset += 1;
      return;
    }

    fn(child, index - offset);
  });
}

export function countNonEmpty(children) {
  let count = 0;
  React.Children.forEach(children, function(child) {
    if (child) {
      count += 1;
    }
  });

  return count;
}

export function getVGutterSizes(children, defaultGutter) {
  return getGutterSizes('gutterTop', 'gutterBottom', children, defaultGutter);
}

export function getHGutterSizes(children, defaultGutter) {
  return getGutterSizes('gutterLeft', 'gutterRight', children, defaultGutter);
}

function getGutterSizes(gutterPrevKey, gutterNextKey, children, defaultGutter) {
  let childrenCount = countNonEmpty(children);
  let gutterSizes = new Array(childrenCount);

  // fill in gutters specified on children
  forEachNonEmpty(children, (child, index) => {
    let gutterPrev = child.props && child.props[gutterPrevKey],
        gutterNext = child.props && child.props[gutterNextKey];

    if (index === 0) {
      gutterSizes[0] = gutterPrev;
    } else {
      if (_.isNumber(gutterSizes[index])) {
        if (_.isNumber(gutterPrev)) {
          gutterSizes[index] = Math.max(gutterSizes[index], gutterPrev);
        }
      } else {
        gutterSizes[index] = gutterPrev;
      }
    }

    gutterSizes[index + 1] = gutterNext;
  });

  // fill in blank gutters with the default
  gutterSizes = gutterSizes.map((gutter, index) => {
    return _.isNumber(gutter) ? gutter :
      index === 0 || index === childrenCount ? 0 :
      defaultGutter;
  });

  return gutterSizes;
}



const sizeRegex = /^\s*(\d+)([^\s]+)\s*$/;

export function sumSizes(dimension, items) {
  const sum = {};

  items.forEach((item) => {
    const size = item.props[dimension];
    if (size === undefined || size === null) { return; }
    if (_.isNumber(size)) {
      addTo(sum, 'px', size);
    } else {
      let matches = sizeRegex.exec(size);
      if (matches) {
        let [, value, unit] = matches;
        addTo(sum, unit, parseInt(value, 10));
      }
    }
  });

  return sum;
}

export function addTo(map, key, value) {
  if (!map[key]) {
    map[key] = value;
  } else {
    map[key] += value;
  }
}

export function getSizeCalc(usedSpace, flexGrow, totalFlexGrow) {
  const ratio = flexGrow / totalFlexGrow;
  const expressions = [`${100 * ratio}%`];

  _.each(usedSpace, (value, unit) => {
    expressions.push(`${value * ratio}${unit}`);
  });

  return `calc(${expressions.join(' - ')})`;
}

export function normalizeAlign(align) {
  let normalized;
  switch (align) {
    case "top":
      normalized = 'flex-start';
      break;
    case "middle":
      normalized = 'center';
      break;
    case 'bottom':
      normalized = 'flex-end';
      break;
    default:
      normalized = align;
      break;
  }

  return normalized;
}

export function normalizeJustify(justify) {
  switch (justify) {
    case "left":
      return 'flex-start';
    case "center":
      return 'center';
    case 'right':
      return 'flex-end';
  }
}

export function makeVLayoutItemChildProps(parentProps, childProps = {}, index, gutterSizes, gutterMultiplier) {
  var props = {};

  if (index === 0) {
    props._gutterTop = gutterSizes[0] ? gutterSizes[0] * gutterMultiplier + parentProps.gutterUnit : undefined;
  }
  props._gutterBottom = gutterSizes[index + 1] ? gutterSizes[index + 1] * gutterMultiplier + parentProps.gutterUnit : undefined;
  props.justify = childProps.justify || parentProps.justifyItems;

  return props;
}

export function makeHLayoutItemChildProps(parentProps, childProps = {}, index, gutterSizes, gutterMultiplier) {
  var props = {};

  if (index === 0) {
    props._gutterLeft = gutterSizes[0] ? gutterSizes[0] * gutterMultiplier + parentProps.gutterUnit : undefined;
  }
  props._gutterRight = gutterSizes[index + 1] ? gutterSizes[index + 1] * gutterMultiplier + parentProps.gutterUnit : undefined;
  props.align = childProps.align || parentProps.alignItems;

  return props;
}

export function didDefineWidth(props) {
  return props.width != null || (props.style && props.style.width) != null;
}

export function didDefineHeight(props) {
  return props.height != null || (props.style && props.style.height) != null;
}

export function pxToUnit(dimensionString) {
  if (!dimensionString) { return 0; }
  return parseInt(dimensionString.slice(0, -2), 10);
}
