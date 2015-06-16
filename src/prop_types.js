import React from 'react';

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
  alignItems: 'stretch',
  gutter: 0,
  gutterUnit: 'px'
};

export let HLayoutItemPropTypes = {
  width: React.PropTypes.any,
  height: React.PropTypes.any,
  flexGrow: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
  align: React.PropTypes.oneOf(['top', 'middle', 'baseline', 'bottom', 'stretch']),

  gutterLeft: React.PropTypes.number,
  gutterRight: React.PropTypes.number,

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
  justify: React.PropTypes.oneOf(['left', 'center', 'right', 'stretch']),

  gutterTop: React.PropTypes.number,
  gutterBottom: React.PropTypes.number,

  // Used internally by VLayout
  _gutterTop: React.PropTypes.string,
  _gutterBottom: React.PropTypes.string
};

