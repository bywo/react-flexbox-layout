import _ from 'lodash';
import React from 'react';
import { HLayout, HLayoutItem, VLayout, VLayoutItem, EXPAND_CHILD } from 'react-flexbox-layout';

function renderContent() {
  return (
    <div style={{overflow: 'auto', background: 'white'}}>
      {_.range(100).map((i) => <div key={i}>{i}</div>)}
    </div>
  );
}

React.render((
  <VLayout style={{height: 400}}>
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
