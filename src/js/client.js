import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Router,hashHistory,IndexRoute} from 'react-router';
import Layout from './pages/layout';
import Featured from './pages/Featured';
import Setting from './pages/Setting';
import Archives from './pages/Archives';
import Todo from './pages/Todo';
import Headlines from './pages/Headlines';
import Favorite from './pages/Favorite';

const app = document.getElementById('app');
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout} >
			<IndexRoute  component={Headlines} ></IndexRoute>
			<Route path="archives/:article" name="archive" component={Archives} ></Route>
			<Route path="headlines" component={Headlines} ></Route>
			<Route path="favorite" component={Favorite} ></Route>
			<Route path="featured" component={Featured} ></Route>
			<Route path="todo" component={Todo} ></Route>
		</Route>
	</Router>
,app);