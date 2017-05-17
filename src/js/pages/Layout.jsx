import React from 'react';
import Link from 'react-router';
import UserInfo from './userinfo';

class Layout extends React.Component {
  
  // navigate() {
  //   // console.log(this.props.history);
  //   this.props.history.replaceState(null, '/');
  //   //  this.props.history.goBack();
  // }

  render() {
    return (
      <div className="row">
        <div className="col s12" id="header">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Complete News</a>
              <a href="#!" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="headlines" activeClassName="activelink"> <span>Headlines </span>
                </Link></li>
                <li><Link to="setting" activeClassName="activelink">
                  <span> Setting</span> </Link></li>
                <li>
                  <UserInfo />
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="children">
          { this.props.children }
        </div>
        <div className="col s12">
          <footer>
            <h6>
              &copy; 2017 Complete news Ltd
              <a
                href="mailto:okwudiri.okoro@andela.com?Subject=User%20Feedback"
                target="_top" id="feedback-mail"
              >
                Contact Developer
              </a>
            </h6>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
