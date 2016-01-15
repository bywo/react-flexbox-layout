import _ from 'lodash';
import React from 'react';
import HLayoutItem from './horizontal_item';
import {HLayoutPropTypes, HLayoutDefaultPropTypes} from './prop_types';
import {
  getHGutterSizes, makeHLayoutItemChildProps,
  mapNonEmpty, normalizeJustify
} from './util';
import {cssValueToOldFlexSyntax} from './vendors_helper';

export default function(defaultGutter, gutterMultiplier, defaultGutterUnit) {
  class HLayout extends React.Component {
    componentDidMount() {
      this.props.onLayout && this.props.onLayout();
    }

    componentDidUpdate() {
      this.props.onLayout && this.props.onLayout();
    }

    render() {
      let gutterSizes = getHGutterSizes(this.props.children, this.props.gutter);

      let children = mapNonEmpty(this.props.children, (child, index) => {
        let props = makeHLayoutItemChildProps(this.props, child.props, index, gutterSizes, gutterMultiplier);

        if (child.type && child.type._isLayoutChild) {
          return React.cloneElement(child, props);
        } else {
          return <HLayoutItem {...props}>{child}</HLayoutItem>;
        }
      });

      return (
        <div
          data-display-name="HLayout"
          {...this.props}
          className="appLayoutVendoredFlex"
          style={_.extend(this._getContainerStyles(), this.props.style)}
        >
          {children}
        </div>
      );
    }

    _getContainerStyles () {
      let justifyItems = normalizeJustify(this.props.justifyItems);

      let styles = {
        width: this.props.width,
        height: this.props.height
      };

      // display:flex
      // done through class name so we get vendor prefixes

      // flex-direction
      styles.WebkitBoxOrient = 'horizontal';
      styles.WebkitBoxDirection = 'normal';
      styles.WebkitFlexDirection = 'row';
      styles.msFlexDirection = 'row';
      styles.flexDirection = 'row';
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


  HLayout.propTypes = HLayoutPropTypes;
  HLayout.defaultProps = _.extend({}, HLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return HLayout;
}
