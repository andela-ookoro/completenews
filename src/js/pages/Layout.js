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
				  <a class="navbar-brand" href="myPage" style={{color:'#FF8040'}}>Complete News</a>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
				  <ul class="nav navbar-nav navbar-right">
					<li><Link to="headlines" activeClassName="activelink"> <span>Headlines </span></Link></li>
					<li><Link to="setting" activeClassName="activelink"><span> Setting</span> </Link></li>
					<li><Link to="favorite" activeClassName="activelink"> <span>Favorite</span> </Link></li>
					<li><Link to="todo" activeClassName="activelink"><span> Todo list</span> </Link></li>
					<li><a href="\signout">Sign out</a></li>
					<li style={{color:'#FF8040'}} ><span id="usernamet" ref="username">Okoro Okwudiri</span></li>
				  </ul>
				</div>
			  </div>
			</nav>
			{this.props.children}
		</div>
		);	
	}
}
export default Layout;
