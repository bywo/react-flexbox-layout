import _ from 'lodash';
import React from 'react';
import {VLayoutItemPropTypes} from './prop_types';
import {cssValueToOldFlexSyntax, prefixFlexProp} from './vendors_helper';
import {normalizeJustify} from './util';

export default class VLayoutItem extends React.Component {
  render() {
    return (
      <div
        data-display-name="VLayoutItem"
        className={this._getClassname()}
        style={_.extend(this._getStyles(), this.props.style)}
      >
        {this.props.children}
      </div>
    );
  }

  _getStyles() {
    let {width, height, flexGrow, _gutterTop, _gutterBottom} = this.props;
    let style = {width, height};

    if (flexGrow) {
      let grow = flexGrow === true ? 1 : flexGrow;
      style = prefixFlexProp(style, grow, 0, 0);
    } else {
      style = prefixFlexProp(style, 0, 0, 'auto');
    }

    let align = normalizeJustify(this.props.justify);

    // Browser vendor prefixes
    // align-self
    style.WebkitAlignSelf = align;
    style.msFlexItemAlign = cssValueToOldFlexSyntax(align);
    style.alignSelf = align;


    if (_gutterTop) {
      style.marginTop = _gutterTop;
    }
    if (_gutterBottom) {
      style.marginBottom = _gutterBottom;
    }

    return style;
  }

  _getClassname() {
    if (this._mustGrowChild()) {
      return "appLayoutGrowChildFlex";
    }

    return "";
  }

  _mustGrowChild() {
    return (this.props.flexGrow || this.props.height);
  }
}

VLayoutItem.propTypes = VLayoutItemPropTypes;


