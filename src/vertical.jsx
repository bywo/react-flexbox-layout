import _ from 'lodash';
import React from 'react';
import ReactStyle from 'react-style';
import VLayoutItem from './vertical_item';
import {VLayoutPropTypes, VLayoutDefaultPropTypes} from './prop_types';
import {getVGutterSizes, mapNonEmpty} from './util';
import {cssValueToOldFlexSyntax} from './vendors_helper';

export default class VLayout extends React.Component {
  render() {
    let gutterSizes = getVGutterSizes(this.props.children, this.props.gutter);

    let children = mapNonEmpty(this.props.children, (child, index) => {
      let props = {};

      if (index === 0) {
        props._gutterTop = gutterSizes[0];
      }
      props._gutterBottom = gutterSizes[index + 1];
      props.justify = child.props.justify || this.props.justifyItems;

      if (child.type === VLayoutItem) {
        return React.cloneElement(child, props);
      } else {
        return <VLayoutItem {...props}>{child}</VLayoutItem>;
      }
    });

    return (
      <div
        data-display-name="VLayout"
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
    let justifyItems, alignItems;

    switch (this.props.justifyItems) {
      case "left":
        justifyItems = 'flex-start';
        break;
      case 'right':
        justifyItems = 'flex-end';
        break;
      default:
        justifyItems = this.props.justifyItems;
        break;
    }
    switch (this.props.alignItems) {
      case "top":
        alignItems = 'flex-start';
        break;
      case "middle":
        alignItems = 'center';
        break;
      case 'bottom':
        alignItems = 'flex-end';
        break;
    }

    let styles = {
      width: this.props.width,
      height: this.props.height
    };

    // Flex with vendor prefixes:
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
    styles.WebkitBoxPack = cssValueToOldFlexSyntax(alignItems);
    styles.WebkitJustifyContent = alignItems;
    styles.msFlexPack = cssValueToOldFlexSyntax(alignItems);
    styles.justifyContent = alignItems;
    // align-items
    styles.WebkitBoxAlign = cssValueToOldFlexSyntax(justifyItems);
    styles.WebkitAlignItems = justifyItems;
    styles.msFlexAlign = cssValueToOldFlexSyntax(justifyItems);
    styles.alignItems = justifyItems;

    return ReactStyle.create(styles);
  }
}

VLayout.propTypes = VLayoutPropTypes;
VLayout.defaultProps = VLayoutDefaultPropTypes;


