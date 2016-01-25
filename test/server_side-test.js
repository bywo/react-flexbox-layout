import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createCustomClasses } from '../lib';

function createApp({ VLayout, VLayoutItem, HLayout, HLayoutItem }) {
  return class App extends React.Component {
    render() {
      return (
        <VLayout>
          <VLayoutItem>
            Top
          </VLayoutItem>
          <VLayoutItem flexGrow />
          <VLayoutItem height={50}>
            <div>
              Bottom
              <HLayout>
                <div>
                  Left
                </div>
                <HLayoutItem flexGrow>
                  Right
                </HLayoutItem>
              </HLayout>
            </div>
          </VLayoutItem>
        </VLayout>
      );
    }
  };
}

console.log('RENDERING FLEXBOX LAYOUT:');
console.log(ReactDOMServer.renderToString(React.createElement(
  createApp(createCustomClasses())
)));
console.log('\n');
console.log('RENDERING SIMULATED FLEXBOX LAYOUT (IE9):');
console.log(ReactDOMServer.renderToString(React.createElement(
  createApp(createCustomClasses({ simulateFlexbox: true }))
)));
