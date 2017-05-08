import React from 'react';
import Link from 'react-router';
import Login from './login.jsx';

class Layout extends React.Component {
  navigate() {
    // console.log(this.props.history);
    this.props.history.replaceState(null,'/');
    //  this.props.history.goBack();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" style={{ marginRight: `${10} + px ` }} className="brand-logo">Complete News</a>
              <a href="#!" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="headlines" activeClassName="activelink"> <span>Headlines </span>
                </Link></li>
                <li><Link to="setting" activeClassName="activelink">
                  <span> Setting</span> </Link></li>
                <li  >
                  <Login />
                </li>
              </ul>
            </div>
          </nav>
        </div>
        { this.props.children }
      </div>
    );
  }
}


export default Layout;
