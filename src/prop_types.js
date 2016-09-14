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
  height: React.PropTypes.any,
  style: function (props, propName, componentName) {
    for (let property of layoutDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}.`);
      }
    }
  },
  onLayout: React.PropTypes.func
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
  _gutterRight: React.PropTypes.string,

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
  justifyItems: React.PropTypes.oneOf(['left', 'center', 'right', 'stretch']),
  alignItems: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
  gutter: React.PropTypes.number,
  gutterUnit: React.PropTypes.string,
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  style: function (props, propName, componentName) {
    for (let property of layoutDangerousStyles) {
      if (props[propName] && props[propName].hasOwnProperty(property)) {
        return new Error(`${componentName} ${propName} can't have ${property}.`);
      }
    }
  },
  onLayout: React.PropTypes.func
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


export const cleanProps = function (props) {
  const proprietaryProps = Object.keys(Object.assign({},
    HLayoutPropTypes,
    HLayoutDefaultPropTypes,
    HLayoutItemPropTypes,
    VLayoutPropTypes,
    VLayoutDefaultPropTypes,
    VLayoutItemPropTypes
  ));
  let safeProps = Object.assign({}, props);
  for (let k in proprietaryProps) {
    delete safeProps[proprietaryProps[k]];
  }
  return safeProps;
};
