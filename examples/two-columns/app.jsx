import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  VLayout,
  HLayout,
  HLayoutItem
} from 'react-flexbox-layout';

import 'react-flexbox-layout/styles.css';

class DummyNode extends React.Component {
  render() {
    let style = {background: '#aaa'};
    _.extend(style, this.props.style);

    return (
      <div {...this.props} style={style} />
    );
  }
}

const cardStyle = {
  width: '33.333333333333336%',
  verticalAlign: 'top',
  display: 'inline-block',
  padding: '5px'
};

const contentStyle = {
  width: '690px',
  minHeight: '500px',
  padding: '20px',
  boxShadow: 'rgba(0,0,0,.4) 0 3px 6px',
  backgroundColor: 'white'
};

ReactDOM.render((
  <div style={{ width: '60%', marginLeft: '10%', marginTop: '5%' }}>
    <VLayout>
      <div style={{ fontSize: '48px', paddingLeft: '15px' }}>
        TWO COLUMNS
      </div>
      <HLayout gutter={0} justifyItems='left' alignItems='top'>
        <HLayoutItem style={{ widht: '230px', height: '200px' }}>
          <DummyNode style={{padding: 10}}>Left</DummyNode>
        </HLayoutItem>

        <HLayoutItem align='stretch' style={contentStyle}>
          <div style={{  minWidth: 0 }}>
            <h3>Central Column</h3>
            <p style={{ fontSize: '16px', fontWeight: 200, lineHeight: '19.7px' }}>
              Because the size of this paragraph is longer that the container, flex-shrink cannot calculate the width beforehand and make a mess with
              the layout. To prevent problems with this, we change `flex: 1 0 auto` to `flex: auto`.
            </p>
            <div>
              <div style={cardStyle}>
                <DummyNode>One</DummyNode>
              </div>
              <div style={cardStyle}>
                <DummyNode>Two</DummyNode>
              </div>
              <div style={cardStyle}>
                <DummyNode>Three</DummyNode>
              </div>
              <div style={cardStyle}>
                <DummyNode>Four</DummyNode>
              </div>
              <div style={cardStyle}>
                <DummyNode>Five</DummyNode>
              </div>
              <div style={cardStyle}>
                <DummyNode>Six</DummyNode>
              </div>
            </div>
          </div>
        </HLayoutItem>
      </HLayout>
    </VLayout>
  </div>
), document.getElementById("example"));
