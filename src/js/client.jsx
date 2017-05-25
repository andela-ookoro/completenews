import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory, IndexRoute } from 'react-router';
import Layout from './pages/Layout';
import Headlines from './pages/Headlines';
import Login from './pages/login';
import RouteNotFound from './pages/404';


const app = document.getElementById('app');

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={Layout} >
    <IndexRoute component={Headlines} />
    <Route path="headlines" component={Headlines} />
    <Route path="login" component={Login} />
    <Route path="*" component={RouteNotFound} />
  </Route>
</Router>
, app);
