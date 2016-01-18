import _ from 'lodash';
import React from 'react';
import {HLayoutItemPropTypes} from './prop_types';
import {normalizeAlign, joinClassNames} from './util';
import {cssValueToOldFlexSyntax, prefixFlexProp} from './vendors_helper';

export default class HLayoutItem extends React.Component {
  render() {
    let props = {
      'data-display-name': "HLayoutItem",
      style: _.extend(this._getStyles(), this.props.style)
    };

    let align = this.props.align;
    if (align === 'stretch') {
      return (
        <div {...this.props} {...props}
          className={joinClassNames(this.props.className, "appLayoutGrowChildFlex")}
        >
          {this.props.children}
        </div>
      );
    }

    return (
      <div {...this.props} {...props}
        className={joinClassNames(
          this.props.className,
          this.props.height ? 'appLayoutGrowChildStatic' : null
        )}
      >
        {this.props.children}
      </div>
    );
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

    let align = normalizeAlign(this.props.align);

    // Browser vendor prefixes
    // align-self
    style.WebkitAlignSelf = align;
    style.msFlexItemAlign = cssValueToOldFlexSyntax(align);
    style.alignSelf = align;


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
