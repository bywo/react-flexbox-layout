import _ from 'lodash';
import React from 'react';
import ReactStyle from 'react-style';
import commonStyles from 'app/views/shared/common_styles';
import {VLayoutItemPropTypes} from './prop_types';
import {cssValueToOldFlexSyntax, prefixFlexProp} from './vendors_helper';

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

    let align;
    switch (this.props.justify) {
      case "left":
        align = 'flex-start';
        break;
      case "right":
        align = 'flex-end';
        break;
      default:
        align = this.props.justify;
        break;
    }

    // Browser vendor prefixes
    // align-self
    style.WebkitAlignSelf = align;
    style.msFlexItemAlign = cssValueToOldFlexSyntax(align);
    style.alignSelf = align;


    let gutterType = 'margin';
    if (_.isNumber(_gutterTop)) {
      style[gutterType + 'Top'] = _gutterTop * commonStyles.layout.gridUnit + 'rem';
    }
    if (_.isNumber(_gutterBottom)) {
      style[gutterType + 'Bottom'] = _gutterBottom * commonStyles.layout.gridUnit + 'rem';
    }

    return ReactStyle.create(style);
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


