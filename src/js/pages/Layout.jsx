import React from 'react';
import Link from 'react-router';
import Login from './login.jsx';

class Layout extends React.Component {
	navigate() {
		console.log(this.props.history);
		this.props.history.replaceState(null,'/');
		//this.props.history.goBack();
	}
	render () {
		return (
		<div class="row">
      <div class="col s12">
				<ul id="dropdown1" class="dropdown-content">
					<li><a href="#!">one</a></li>
					<li><a href="#!">two</a></li>
					<li class="divider"></li>
					<li><a href="#!">three</a></li>
				</ul>
				<nav>
					<div class="nav-wrapper">
						<a href="#!" style={{marginRight: 10 + 'px'}} class="brand-logo">Complete News</a>
						<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
						<ul class="right hide-on-med-and-down">
							<li><Link to="headlines" activeClassName="activelink"> <span>Headlines </span></Link></li>
							<li><Link to="setting" activeClassName="activelink"><span> Setting</span> </Link></li>
							<li><a class="dropdown-button" href="#!" data-activates="dropdown1">Dropdown<i class="material-icons right"></i></a></li>
							<li style={{color:'#FF8040'}} > 
								<Login />
							</li>
						</ul>
					</div>
				</nav>
			</div>
			{this.props.children}
    </div>
		);	
	}
}
export default Layout;
