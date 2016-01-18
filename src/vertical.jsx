import _ from 'lodash';
import React from 'react';
import VLayoutItem from './vertical_item';
import {VLayoutPropTypes, VLayoutDefaultPropTypes} from './prop_types';
import {
  getVGutterSizes, makeVLayoutItemChildProps,
  mapNonEmpty, normalizeAlign, joinClassNames
} from './util';
import {cssValueToOldFlexSyntax} from './vendors_helper';

export default function(defaultGutter, gutterMultiplier, defaultGutterUnit) {
  class VLayout extends React.Component {
    componentDidMount() {
      this.props.onLayout && this.props.onLayout();
    }

    componentDidUpdate() {
      this.props.onLayout && this.props.onLayout();
    }

    render() {
      let gutterSizes = getVGutterSizes(this.props.children, this.props.gutter);

      let children = mapNonEmpty(this.props.children, (child, index) => {
        let props = makeVLayoutItemChildProps(this.props, child.props, index, gutterSizes, gutterMultiplier);

        if (child.type && child.type._isLayoutChild) {
          return React.cloneElement(child, props);
        } else {
          return <VLayoutItem {...props}>{child}</VLayoutItem>;
        }
      });

      return (
        <div
          data-display-name="VLayout"
          {...this.props}
          className={joinClassNames(this.props.className, "appLayoutVendoredFlex")}
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
      // done through class name so we get vendor prefixes

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
