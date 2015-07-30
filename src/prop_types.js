import React from 'react';

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
  justifyItems: React.PropTypes.oneOf(['left', 'center', 'right']),
  alignItems: React.PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  gutter: React.PropTypes.number,
  gutterUnit: React.PropTypes.string,
  width: React.PropTypes.any,
  height: React.PropTypes.any
};

export let HLayoutDefaultPropTypes = {
  justifyItems: 'left',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

export let HLayoutItemPropTypes = {
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  flexGrow: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
  align: React.PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),
  justify: shouldNotExist,

  gutterLeft: React.PropTypes.number,
  gutterRight: React.PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by HLayout
  _gutterLeft: React.PropTypes.string,
  _gutterRight: React.PropTypes.string
};


//
// Vertical Layout
//
export let VLayoutPropTypes = {
  justifyItems: React.PropTypes.oneOf(['left', 'center', 'right', 'stretch']),
  alignItems: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
  gutter: React.PropTypes.number,
  gutterUnit: React.PropTypes.string,
  width: React.PropTypes.any,
  height: React.PropTypes.any
};

export let VLayoutDefaultPropTypes = {
  justifyItems: 'stretch',
  alignItems: 'top',
  gutter: 0,
  gutterUnit: 'px'
};

export let VLayoutItemPropTypes = {
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  flexGrow: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
  align: shouldNotExist,
  justify: React.PropTypes.oneOf(['left', 'center', 'right', 'stretch']),

  gutterTop: React.PropTypes.number,
  gutterBottom: React.PropTypes.number,

  children: layoutItemChildrenChecker,

  // Used internally by VLayout
  _gutterTop: React.PropTypes.string,
  _gutterBottom: React.PropTypes.string,

  style: function (props, propName, componentName) {
    const DANGEROUS_STYLES = [
      "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight",
      "margin", "marginTop", "marginBottom", "marginLeft", "marginRight",
      "height", "width", "display", "position", "float",
    ];

    DANGEROUS_STYLES.forEach(function (dangerousStyle) {
      if (props[propName] && props[propName].hasOwnProperty(dangerousStyle)) {
        console.warn(`${componentName} ${propName} can't have ${dangerousStyle}`);
        return new Error(`${componentName} ${propName} can't have ${dangerousStyle}`);
      }
    });
  }
};

