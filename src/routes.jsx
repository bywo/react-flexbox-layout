import React from 'react';
import Router from 'react-router';
import Application from './application';
import Home from './home';

let Route = Router.Route;

// declare our routes and their hierarchy
let routes = (
  <Route handler={Application}>
    <Route path="/home" handler={Home}/>
  </Route>
);

export default routes;
