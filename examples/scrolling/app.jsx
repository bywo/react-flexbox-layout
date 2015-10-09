import _ from 'lodash';
import React from 'react';
import { HLayout, HLayoutItem, VLayout, VLayoutItem, EXPAND_CHILD } from 'react-flexbox-layout';

var contentNode;
function renderContent() {
  return (
    <div style={{overflow: 'auto', background: 'white'}} ref={(node) => contentNode = node}>
      {_.range(100).map((i) => <div key={i}>{i}</div>)}
    </div>
  );
}

var didSetInitialScroll = false;
function setInitialScroll() {
  if (!didSetInitialScroll) {
    setTimeout(() => {
      var content = React.findDOMNode(contentNode);
      content.scrollTop = content.scrollHeight;
    }, 0);

    didSetInitialScroll = true;
  }
}

React.render((
  <VLayout style={{height: 400}} onLayout={setInitialScroll}>
    <VLayoutItem height={100}>
      Header
    </VLayoutItem>

    <VLayoutItem flexGrow>
      {renderContent()}
    </VLayoutItem>

    <VLayoutItem height={100}>
      Footer
    </VLayoutItem>
  </VLayout>
), document.getElementById("example"));
