import React from 'react';
import Router from 'react-router';
import routes from './routes';

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
