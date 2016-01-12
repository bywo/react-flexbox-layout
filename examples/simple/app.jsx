import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { HLayout, HLayoutItem } from 'react-flexbox-layout';

class DummyNode extends React.Component {
  render() {
    let style = {background: '#aaa'};
    _.extend(style, this.props.style);

    return (
      <div {...this.props} style={style} />
    );
  }
}

ReactDOM.render((
  <HLayout gutter={10}>
    <HLayoutItem flexGrow align="top">
      <DummyNode style={{padding: 10}}>top</DummyNode>
    </HLayoutItem>
    <HLayoutItem flexGrow align="middle">
      <DummyNode style={{padding: "10px 10px 40px"}}>middle</DummyNode>
    </HLayoutItem>
    <HLayoutItem flexGrow align="baseline">
      <DummyNode style={{padding: "50px 10px 10px"}}>baseline</DummyNode>
    </HLayoutItem>
    <HLayoutItem flexGrow align="baseline">
      <DummyNode style={{padding: "10px 10px 50px"}}>baseline</DummyNode>
    </HLayoutItem>
    <HLayoutItem flexGrow align="bottom">
      <DummyNode style={{padding: 10}}>bottom</DummyNode>
    </HLayoutItem>
    <HLayoutItem flexGrow align="stretch">
      <DummyNode style={{padding: 10}}>stretch</DummyNode>
    </HLayoutItem>
  </HLayout>
), document.getElementById("example"));
