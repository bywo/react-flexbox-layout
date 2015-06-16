import _ from 'lodash';
import React from 'react';
import HLayoutItem from './horizontal_item';
import {HLayoutPropTypes, HLayoutDefaultPropTypes} from './prop_types';
import {getHGutterSizes, mapNonEmpty, normalizeJustify} from './util';
import {cssValueToOldFlexSyntax} from './vendors_helper';

export default class HLayout extends React.Component {
  render() {
    let gutterSizes = getHGutterSizes(this.props.children, this.props.gutter);

    let children = mapNonEmpty(this.props.children, (child, index) => {
      let props = {};

      if (index === 0) {
        props._gutterLeft = gutterSizes[0] ? gutterSizes[0] + this.props.gutterUnit : undefined;
      }
      props._gutterRight = gutterSizes[index + 1] ? gutterSizes[index + 1] + this.props.gutterUnit : undefined;

      props.align = child.props.align || this.props.alignItems;

      if (child.type === HLayoutItem) {
        return React.cloneElement(child, props);
      } else {
        return <HLayoutItem {...props}>{child}</HLayoutItem>;
      }
    });

    return (
      <div
        data-display-name="HLayout"
        style={_.extend(this._getContainerStyles(), this.props.style)}
      >
        {children}
      </div>
    );
  }

  componentDidMount() {
    let style = React.findDOMNode(this).style;

    // Set display: flex with vendor prefixes. the last valid one will "stick"
    style.display = '-webkit-box';
    style.display = '-webkit-flex';
    style.display = '-ms-flexbox';
    style.display = 'flex';
  }

  _getContainerStyles () {
    let justifyItems = normalizeJustify(this.props.justifyItems);

    let styles = {
      width: this.props.width,
      height: this.props.height
    };

    // Flex with vendor prefixes:
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
HLayout.defaultProps = HLayoutDefaultPropTypes;
