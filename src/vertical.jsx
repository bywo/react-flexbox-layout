import _ from 'lodash';
import React from 'react';
import VLayoutItem from './vertical_item';
import {VLayoutPropTypes, VLayoutDefaultPropTypes} from './prop_types';
import {
  getVGutterSizes, makeVLayoutItemChildProps,
  mapNonEmpty, normalizeAlign
} from './util';
import {prefixDisplayFlex, cssValueToOldFlexSyntax} from './vendors_helper';

export default function(defaultGutter, gutterMultiplier, defaultGutterUnit) {
  class VLayout extends React.Component {
    render() {
      let gutterSizes = getVGutterSizes(this.props.children, this.props.gutter);

      let children = mapNonEmpty(this.props.children, (child, index) => {
        let props = makeVLayoutItemChildProps(this.props, child.props, index, gutterSizes, gutterMultiplier);

        if (child.type._isLayoutChild) {
          return React.cloneElement(child, props);
        } else {
          return <VLayoutItem {...props}>{child}</VLayoutItem>;
        }
      });

      return (
        <div
          data-display-name="VLayout"
          {...this.props}
          style={_.extend(this._getContainerStyles(), this.props.style)}
        >
          {children}
        </div>
      );
    }

    _getContainerStyles () {
      let justifyItems = normalizeAlign(this.props.alignItems);

      let styles = {
        width: this.props.width,
        height: this.props.height
      };

      // Flex with vendor prefixes:
      // display:flex
      styles.display = prefixDisplayFlex();
      // flex-direction
      styles.WebkitBoxOrient = 'vertical';
      styles.WebkitBoxDirection = 'normal';
      styles.WebkitFlexDirection = 'column';
      styles.msFlexDirection = 'column';
      styles.flexDirection = 'column';
      // flex-wrap
      styles.WebkitFlexWrap = 'nowrap';
      styles.msFlexWrap = 'nowrap';
      styles.flexWrap = 'nowrap';
      // justify-content
      styles.WebkitBoxPack = cssValueToOldFlexSyntax(justifyItems);
      styles.WebkitJustifyContent = justifyItems;
      styles.msFlexPack = cssValueToOldFlexSyntax(justifyItems);
      styles.justifyContent = justifyItems;

      return styles;
    }
  }

  VLayout.propTypes = VLayoutPropTypes;
  VLayout.defaultProps = _.extend({}, VLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return VLayout;
}


