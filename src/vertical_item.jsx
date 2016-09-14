import extend from 'lodash/extend';
import React from 'react';
import classNames from 'classnames';
import {VLayoutItemPropTypes, cleanProps} from './prop_types';
import {prefixFlexProp} from './vendors_helper';
import {normalizeJustify} from './util';

export default class VLayoutItem extends React.Component {
  render() {
    return (
      <div
        data-display-name="VLayoutItem"
        {...cleanProps(this.props)}
        className={classNames(this.props.className, this._getClassName())}
        style={extend(this._getStyles(), this.props.style)}
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

    if (_gutterTop) {
      style.marginTop = _gutterTop;
    }
    if (_gutterBottom) {
      style.marginBottom = _gutterBottom;
    }

    return style;
  }

  _getClassName() {
    let align = normalizeJustify(this.props.justify);
    return classNames(
      this._mustGrowChild() && "rflGrowChildFlex",
      align && `rflAlignSelf_${align}`
    );
  }

  _mustGrowChild() {
    return (this.props.flexGrow || this.props.height);
  }
}

VLayoutItem.propTypes = VLayoutItemPropTypes;
VLayoutItem._isLayoutChild = true;
