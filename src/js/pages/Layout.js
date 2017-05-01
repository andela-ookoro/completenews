import React from 'react';
import {Link} from 'react-router';
class Layout extends React.Component {
	navigate() {
		console.log(this.props.history);
		this.props.history.replaceState(null,'/');
		//this.props.history.goBack();
	}
	render () {
		return (
		<div>
			<nav class="navbar navbar-default navbar-fixed-top">
			  <div class="container">
				<div class="navbar-header">
				  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>                        
				  </button>
				  <a class="navbar-brand" href="myPage" style={{color:'#FF8040'}}>Issue Tracker</a>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
				  <ul class="nav navbar-nav navbar-right">
					<li><Link to="archives" activeClassName="activelink"> <span>Archives </span></Link></li>
					<li><Link to="setting" activeClassName="activelink"><span> Setting</span> </Link></li>
					<li><Link to="featured" activeClassName="activelink"> <span>Featured</span> </Link></li>
					<li><Link to="todo" activeClassName="activelink"><span> Todo list</span> </Link></li>
					<li><a href="\signout">Sign out</a></li>
					 <li ><a id="usernamet" ></a></li>
				  </ul>
				</div>
			  </div>
			</nav>
			<h2> KillerNew.net Layout </h2>
			{this.props.children}
		</div>
		);	
	}
}
export default Layout;
