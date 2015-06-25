import React from 'react';
import _ from 'lodash';
import {VLayoutItemPropTypes} from './prop_types';


export default class VLayoutItemIE9 extends React.Component {

  componentDidMount() {
    this.node = React.findDOMNode(this);
    this.inner = React.findDOMNode(this.refs.inner);
  }

  render() {
    return (
      <div data-display-name="VLayoutItemWrapper" style={this._getItemWrapperStyles()}>
        <div ref="inner" style={this._getItemStyles()}
          data-display-name="VLayoutItem"
          className={this._getClassname()}
        >

          {this.props.children}
        </div>
      </div>
    );
  }

  _unsetLayoutStyles() {
    const style = this.node.style;

    if (!this.props.width) {
      style.width = '';
    }

    if (!this.props.height) {
      style.height = '';
    }

    style.textAlign = '';
    this.inner.style.textAlign = '';
  }

  _applyInheritedStyles(textAlign) {
    let justify = this.props.justify;
    if (justify !== 'stretch') {
      this.node.style.textAlign = justify;
    }

    const userStyle = this.props.style || {};

    this.inner.style.textAlign = userStyle.textAlign || textAlign;
  }

  _measureHeight() {
    return this.node.offsetHeight;
  }

  _applyHeight(height) {
    this.node.style.height = height;
  }

  _getItemWrapperStyles() {
    let {height, _gutterTop, _gutterBottom} = this.props;

    let styles = {
      display: 'block',
      height: height
    };

    let gutterType = 'margin';
    if (_gutterTop) {
      styles[gutterType + 'Top'] = _gutterTop;
    }
    if (_gutterBottom) {
      styles[gutterType + 'Bottom'] = _gutterBottom;
    }

    return styles;
  }

  _getItemStyles() {
    let styles = {
      display: this.props.justify === 'stretch' ? 'block' : 'inline-block',
      width: this.props.width
    };

    if (this.props.flexGrow) {
      styles.height = '100%';
    }

    return styles;
  }

  _getClassname() {
    if (this._mustGrowChild()) {
      return "appLayoutGrowChildStatic";
    }

    return "";
  }

  _mustGrowChild() {
    return (this.props.flexGrow || this.props.height);
  }

}


VLayoutItemIE9.propTypes = VLayoutItemPropTypes;
VLayoutItemIE9._isLayoutChild = true;
