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
    let gutterPrev = child.props[gutterPrevKey],
        gutterNext = child.props[gutterNextKey];

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
