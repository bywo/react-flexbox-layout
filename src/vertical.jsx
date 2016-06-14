import extend from 'lodash/extend';
import React from 'react';
import classNames from 'classnames';
import VLayoutItem from './vertical_item';
import {VLayoutPropTypes, VLayoutDefaultPropTypes} from './prop_types';
import {
  getVGutterSizes, makeVLayoutItemChildProps,
  mapNonEmpty, normalizeAlign
} from './util';

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
          className={classNames(this.props.className, this._getContainerClassName())}
          style={extend(this._getContainerStyles(), this.props.style)}
        >
          {children}
        </div>
      );
    }

    _getContainerClassName() {
      let justifyItems = normalizeAlign(this.props.alignItems);
      return classNames("rflFlex rflFlexVertical", justifyItems && `rflJustifyContent_${justifyItems}`);
    }

    _getContainerStyles () {
      return {
        width: this.props.width,
        height: this.props.height
      };
    }
  }

  VLayout.propTypes = VLayoutPropTypes;
  VLayout.defaultProps = extend({}, VLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return VLayout;
}
