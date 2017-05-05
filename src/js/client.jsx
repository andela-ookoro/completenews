import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';
import Layout from './pages/Layout.jsx';
import Headlines from './pages/Headlines.jsx';

const app = document.getElementById('app');
ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={Layout} >
    <IndexRoute component={Headlines} />
    <Route path="headlines" component={Headlines} />
  </Route>
</Router>
, app);
