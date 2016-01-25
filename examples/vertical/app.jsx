import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { VLayout, VLayoutItem } from 'react-flexbox-layout';
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

ReactDOM.render((
  <VLayout height={300} gutter={10} style={{textAlign: 'right'}}>
    <VLayoutItem width={100} flexGrow justify="left">
      <DummyNode style={{padding: 10}}>left</DummyNode>
    </VLayoutItem>
    <VLayoutItem width={100} flexGrow justify="center">
      <DummyNode style={{padding: 10}}>center</DummyNode>
    </VLayoutItem>
    <VLayoutItem width={100} flexGrow justify="right">
      <DummyNode style={{padding: 10}}>right</DummyNode>
    </VLayoutItem>
    <VLayoutItem flexGrow justify="stretch">
      <DummyNode style={{padding: 10}}>stretch</DummyNode>
    </VLayoutItem>
  </VLayout>
), document.getElementById("example"));
