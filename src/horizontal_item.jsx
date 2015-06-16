import _ from 'lodash';
import React from 'react';
import {HLayoutItemPropTypes} from './prop_types';
import {cssValueToOldFlexSyntax, prefixFlexProp} from './vendors_helper';

export default class HLayoutItem extends React.Component {
  render() {
    let props = {
      'data-display-name': "HLayoutItem",
      style: _.extend(this._getStyles(), this.props.style)
    };

    let align = this.props.align || this.props._defaultAlign;
    if (align === 'stretch') {
      return (
        <div {...props}
          className="appLayoutGrowChildFlex"
        >
          {this.props.children}
        </div>
      );
    }

    return (
      <div {...props}
        className={this.props.height ? 'appLayoutGrowChildStatic' : null}
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

    let align = this.props.align || this.props._defaultAlign;
    switch (align) {
      case "top":
        align = 'flex-start';
        break;
      case "middle":
        align = 'center';
        break;
      case 'bottom':
        align = 'flex-end';
        break;
      default:
        align = align;
        break;
    }

    // Browser vendor prefixes
    // align-self
    style.WebkitAlignSelf = align;
    style.msFlexItemAlign = cssValueToOldFlexSyntax(align);
    style.alignSelf = align;


    let gutterType = 'margin';
    if (_.isNumber(_gutterLeft)) {
      style[gutterType + 'Left'] = _gutterLeft;
    }
    if (_.isNumber(_gutterRight)) {
      style[gutterType + 'Right'] = _gutterRight;
    }

    return style;
  }
}

HLayoutItem.propTypes = HLayoutItemPropTypes;


