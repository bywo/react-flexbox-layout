import PropTypes from 'prop-types';
import React from 'react';
import keys from 'lodash/keys';
import assign from 'lodash/assign';
import omit from 'lodash/omit';

function layoutItemChildrenChecker(props, propName, componentName) {
  if (React.Children.count(props[propName]) > 1) {
    return new Error(`Can't provide more than one child to ${componentName}.`);
  }
}

function shouldNotExist(props, propName, componentName) {
  if (props.hasOwnProperty(propName)) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
  }
}

//
// Horizontal Layout
//
export let HLayoutPropTypes = {
  justifyItems: PropTypes.oneOf(['left', 'center', 'right']),
  alignItems: PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  gutter: PropTypes.number,
  gutterUnit: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  style: function (props, propName, componentName) {
    for (let property of layoutDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}.`);
      }
    }
  },
  onLayout: PropTypes.func
};

export let HLayoutDefaultPropTypes = {
  justifyItems: 'left',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

export let HLayoutItemPropTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  flexGrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  align: PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  justify: shouldNotExist,

  gutterLeft: PropTypes.number,
  gutterRight: PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by HLayout
  _gutterLeft: PropTypes.string,
  _gutterRight: PropTypes.string,

  style: function (props, propName, componentName) {
    for (let property of layoutItemDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}.`);
      }
    }

    if (props.flexGrow &&
      ((props[propName] && props[propName].hasOwnProperty('width')) || props.hasOwnProperty('width'))
    ) {
      return new Error(`${componentName} can't define width when flexGrow is set.`);
    }

    if (props.align === 'stretch' &&
      ((props[propName] && props[propName].hasOwnProperty('height')) || props.hasOwnProperty('height'))
    ) {
      return new Error(`${componentName} can't define height when align=stretch.`);
    }
  }
};


//
// Vertical Layout
//
export let VLayoutPropTypes = {
  justifyItems: PropTypes.oneOf(['left', 'center', 'right', 'stretch']),
  alignItems: PropTypes.oneOf(['top', 'middle', 'bottom']),
  gutter: PropTypes.number,
  gutterUnit: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  style: function (props, propName, componentName) {
    for (let property of layoutDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}.`);
      }
    }
  },
  onLayout: PropTypes.func
};

export let VLayoutDefaultPropTypes = {
  justifyItems: 'stretch',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

export let VLayoutItemPropTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  flexGrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  align: shouldNotExist,
  justify: PropTypes.oneOf(['left', 'center', 'right', 'stretch']),

  gutterTop: PropTypes.number,
  gutterBottom: PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by VLayout
  _gutterTop: PropTypes.string,
  _gutterBottom: PropTypes.string,

  style: function (props, propName, componentName) {
    for (let property of layoutItemDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}`);
      }
    }

    if (props.flexGrow &&
      ((props[propName] && props[propName].hasOwnProperty('height')) || props.hasOwnProperty('height'))
    ) {
      return new Error(`${componentName} can't define height when flexGrow is set`);
    }

    if (props.justify === 'stretch' &&
      ((props[propName] && props[propName].hasOwnProperty('width')) || props.hasOwnProperty('width'))
    ) {
      return new Error(`${componentName} can't define width when justify=stretch`);
    }
  }
};

const everythingDangerousStyles = [
  "display", "float"
];

const layoutDangerousStyles = everythingDangerousStyles;

const layoutItemDangerousStyles = everythingDangerousStyles.concat([
  "position", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"
]);

const proprietaryProps = keys(assign({},
  HLayoutPropTypes,
  HLayoutDefaultPropTypes,
  HLayoutItemPropTypes,
  VLayoutPropTypes,
  VLayoutDefaultPropTypes,
  VLayoutItemPropTypes
));

export const cleanProps = function (props) {
  return omit(props, proprietaryProps);
};
