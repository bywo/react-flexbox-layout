import extend from 'lodash/extend';
import range from 'lodash/range';
import invokeMap from 'lodash/invokeMap';
import sum from 'lodash/sum';
import React from 'react';
import ReactDOM from 'react-dom';
import HLayoutItemIE9 from './horizontal_item_ie9';
import {HLayoutPropTypes, HLayoutDefaultPropTypes, cleanProps} from './prop_types';
import {
  getHGutterSizes, makeHLayoutItemChildProps,
  mapNonEmpty, countNonEmpty,
  sumSizes, addTo, getSizeCalc,
  didDefineHeight, didDefineWidth,
  pxToUnit
} from './util';
import {register, deregister, requestAsyncUpdate} from './update_engine_ie9';

export default function(defaultGutter, gutterMultiplier, defaultGutterUnit) {
  class HLayoutIE9 extends React.Component {

    componentWillMount() {
      register(this);
    }

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this);
      requestAsyncUpdate();
    }

    componentWillUnmount() {
      deregister(this);
    }

    componentDidUpdate() {
      requestAsyncUpdate();
    }

    render() {
      this.itemsRefs = [];
      this.gutterSizes = getHGutterSizes(this.props.children, this.props.gutter);

      let children = mapNonEmpty(this.props.children, (child, index) => {
        return this._buildChild(child, index, this.gutterSizes);
      });

      return (
        <div ref="horizontal"
          data-display-name="HLayout"
          {...cleanProps(this.props)}
          style={extend(this._getLayoutStyles(), this.props.style)}
        >
          {children}
        </div>
      );
    }

    // Construct the Layout Item by either wrapping the raw
    // child with a Layout Item or cloning the child if its already a
    // Layout Item.
    _buildChild(child, index, gutterSizes) {
      let props = makeHLayoutItemChildProps(this.props, child.props, index, gutterSizes, gutterMultiplier);

      let ref = `item_${index}`;
      this.itemsRefs.push(ref);
      props.ref = ref;

      if (child.type && child.type._isLayoutChild) {
        return React.cloneElement(child, props);
      } else {
        return (
          <HLayoutItemIE9 {...props}>{child}</HLayoutItemIE9>
        );
      }
    }

    _unsetLayoutStyles() {
      const style = this.node.style;

      if (!didDefineHeight(this.props)) {
        style.height = '';
      }
      style.whiteSpace = '';
      style.textAlign = '';

      range(countNonEmpty(this.props.children)).forEach((i) => {

        this.refs[`item_${i}`]._unsetLayoutStyles();
      }, this);
    }

    _measureInheritedStyles() {
      const computedStyle = window.getComputedStyle(this.node);
      this._inheritedWhiteSpace = computedStyle.whiteSpace;
      this._inheritedTextAlign = computedStyle.textAlign;
      this._inheritedLineHeight = computedStyle.lineHeight;
    }

    _measureWidths() {
      this._measuredWidths = range(countNonEmpty(this.props.children)).map((i) => {
        const item = this.refs[`item_${i}`];
        if (didDefineWidth(item.props) || item.props.flexGrow) {
          return null;
        }
        return item._measureWidth();
      });
    }

    _applyInheritedStyles() {
      const style = this.node.style;
      style.whiteSpace = 'nowrap';
      style.textAlign = this.props.justifyItems;

      const items = this.itemsRefs.map(ref => this.refs[ref]);
      invokeMap(items, '_applyInheritedStyles', this._inheritedWhiteSpace, this._inheritedTextAlign, this._inheritedLineHeight);
    }

    _applyWidths() {
      const items = this.itemsRefs.map(ref => this.refs[ref]);

      const flexGrowValues = items
        .filter(item => item.props.flexGrow)
        .map(item => item.props.flexGrow === true ? 1 : item.props.flexGrow);
      const totalFlexGrow = sum(flexGrowValues);

      // sum widths used up by elements
      const usedSpace = sumSizes('width', items);

      // add computed widths
      const measuredWidthsAsNumbers = this._measuredWidths
        .filter(i => i !== null)
        .map(measurement => parseFloat(measurement.slice(0, -2)));
      addTo(usedSpace, 'px', sum(measuredWidthsAsNumbers));

      // add gutters
      addTo(usedSpace, this.props.gutterUnit, sum(this.gutterSizes));

      range(countNonEmpty(this.props.children)).forEach((i) => {
        const item = this.refs[`item_${i}`];
        if (item.props.flexGrow) {
          return item._applyWidth(getSizeCalc(usedSpace, item.props.flexGrow, totalFlexGrow));
        } else if (!didDefineWidth(item.props)) {
          item._applyWidth(this._measuredWidths[i]);
        }
      });
    }

    _measureItemHeights() {}
    _applyFlexHeights() {}

    _setContainerHeights() {
      const height = this.node.offsetHeight;
      const style = this.node.style;
      const computedStyle = window.getComputedStyle(this.node);
      const heightWithoutPadding = height - pxToUnit(computedStyle.paddingTop) - pxToUnit(computedStyle.paddingBottom);

      const heightString = `${height}px`;
      const heightWithoutPaddingString = `${heightWithoutPadding}px`;

      style.height = heightString;
      const items = this.itemsRefs.map(ref => this.refs[ref]);
      invokeMap(items, '_setContainerHeight', heightWithoutPaddingString);
    }

    _callDidLayout() {
      this.props.onLayout && this.props.onLayout();
    }

    _getLayoutStyles () {
      let styles = {
        display: 'block',
        width: this.props.width,
        height: this.props.height
      };

      return styles;
    }
  }


  HLayoutIE9.propTypes = HLayoutPropTypes;
  HLayoutIE9.defaultProps = extend({}, HLayoutDefaultPropTypes, {
    gutter: defaultGutter,
    gutterUnit: defaultGutterUnit
  });

  return HLayoutIE9;
}
