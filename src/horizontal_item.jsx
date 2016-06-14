import extend from 'lodash/extend';
import React from 'react';
import classNames from 'classnames';
import {HLayoutItemPropTypes} from './prop_types';
import {normalizeAlign} from './util';
import {prefixFlexProp} from './vendors_helper';

export default class HLayoutItem extends React.Component {
  render() {
    let props = {
      'data-display-name': "HLayoutItem",
      style: extend(this._getStyles(), this.props.style)
    };

    return (
      <div {...this.props} {...props}
        className={classNames(this.props.className, this._getClassName())}
      >
        {this.props.children}
      </div>
    );
  }

  _getClassName() {
    let growClassName = (this.props.align === 'stretch') ?
      "rflGrowChildFlex" : (this.props.height ? 'rflGrowChildStatic' : null);
    let align = normalizeAlign(this.props.align);

    return classNames(growClassName, align && `rflAlignSelf_${align}`);
  }

  _getStyles() {
    let {width, height, flexGrow, _gutterLeft, _gutterRight} = this.props;
    let style = {width, height};

    if (flexGrow) {
      let grow = flexGrow === true ? 1 : flexGrow;
      style = prefixFlexProp(style, grow, 0, 0);
    } else {
      style = prefixFlexProp(style, 0, 0, 'auto');
    }

    if (_gutterLeft) {
      style.marginLeft = _gutterLeft;
    }
    if (_gutterRight) {
      style.marginRight = _gutterRight;
    }

    return style;
  }
}

HLayoutItem.propTypes = HLayoutItemPropTypes;
HLayoutItem._isLayoutChild = true;
