import extend from 'lodash/extend';
import React from 'react';
import ReactDOM from 'react-dom';
import {didDefineWidth} from './util';
import {HLayoutItemPropTypes, cleanProps} from './prop_types';


export default class HLayoutItemIE9 extends React.Component {

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
  }

  render() {
    if (!this._requiresExtraWrapper()) {
      return (
        <div ref="inner"
          data-display-name="HLayoutItem"
          {...cleanProps(this.props)}
          className={this.props.className ? this.props.className + ' ' + this._getClassname() : this._getClassname()}
          style={extend(this._getInnerStyles(), this._getWrapperStyles(), this.props.style)}
        >
          {this.props.children}
        </div>
      );
    } else {

      return (
        <div data-display-name="HLayoutItemWrapper" {...cleanProps(this.props)} style={extend(this._getWrapperStyles())}>
          <div style={{display: 'inline-block', verticalAlign: 'middle', width: 0, overflow: 'hidden'}}>a</div>
          <div ref="inner"
            data-display-name="HLayoutItem"
            className={this._getClassname()}
            style={extend(this._getInnerStyles(), {width: '100%'}, this.props.style)}
          >
            {this.props.children}
          </div>
        </div>
      );
    }
  }

  _unsetLayoutStyles() {
    const style = this.node.style;

    if (!didDefineWidth(this.props)) {
      style.width = '';
    }

    if (this._requiresExtraWrapper()) {
      style.lineHeight = '';
    }

    if (this.props.align === 'stretch') {
      style.height = '';
      this.node.className = "";
    }
  }

  _measureWidth() {
    return getComputedStyle(this.node).width;
  }

  _applyInheritedStyles(whiteSpace, textAlign, lineHeight) {
    const style = ReactDOM.findDOMNode(this.refs.inner).style;

    const userStyle = this.props.style || {};

    style.whiteSpace = userStyle.whiteSpace || whiteSpace;
    style.textAlign = userStyle.textAlign || textAlign;
    style.lineHeight = userStyle.lineHeight || lineHeight;
  }

  _applyWidth(width) {
    this.node.style.width = width;
  }

  _setContainerHeight(height) {
    if (this._requiresExtraWrapper()) {
      this.node.style.lineHeight = height;
    } else if (this.props.align === 'stretch') {
      this.node.style.height = '100%';
      this.node.className = this._getClassname();
    }
  }

  _getWrapperStyles() {
    const style = {
      display: 'inline-block'
    };
    const {_gutterLeft, _gutterRight} = this.props;

    style.width = this.props.width;

    if (_gutterLeft) {
      style.marginLeft = _gutterLeft;
    }
    if (_gutterRight) {
      style.marginRight = _gutterRight;
    }

    if (this._requiresExtraWrapper()) {
      style.verticalAlign = 'top';
    }

    return style;
  }

  _getInnerStyles() {
    const style = {
      display: 'inline-block'
    };

    style.height = this.props.height;

    let align = this.props.align;
    if (align === 'stretch') {
      style.verticalAlign = 'top';
    } else {
      style.verticalAlign = align;
    }

    return style;
  }

  _getClassname() {
    let align = this.props.align;
    if (align === 'stretch' || this.props.height) {
      return "rflGrowChildStatic";
    }
    return "";
  }

  /**
   * In order to match flexbox behavior where align:baseline elements only align baselines with each other, we need to
   * wrap other align types in a wrapper so that their baselines don't align.
   */
  _requiresExtraWrapper() {
    const align = this.props.align;
    return align === 'middle' || align === 'bottom';
  }
}

HLayoutItemIE9.propTypes = HLayoutItemPropTypes;
HLayoutItemIE9._isLayoutChild = true;
