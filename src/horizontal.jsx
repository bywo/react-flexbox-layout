import extend from 'lodash/extend';
import React from 'react';
import classNames from 'classnames';
import HLayoutItem from './horizontal_item';
import {HLayoutPropTypes, HLayoutDefaultPropTypes, cleanProps} from './prop_types';
import {
  getHGutterSizes, makeHLayoutItemChildProps,
  mapNonEmpty, normalizeJustify
} from './util';

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
          {...cleanProps(this.props)}
          className={classNames(this.props.className, this._getContainerClassName())}
          style={extend(this._getContainerStyles(), this.props.style)}
        >
          {children}
        </div>
      );
    }

    _getContainerClassName() {
      let justifyItems = normalizeJustify(this.props.justifyItems);
      return classNames("rflFlex rflFlexHorizontal", justifyItems && `rflJustifyContent_${justifyItems}`);
    }

    _getContainerStyles () {
      return {
        width: this.props.width,
        height: this.props.height
      };
    }
  }


  HLayout.propTypes = HLayoutPropTypes;
  HLayout.defaultProps = extend({}, HLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return HLayout;
}
