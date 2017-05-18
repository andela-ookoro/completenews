import React from 'react';
import Link from 'react-router';
import PropTypes from 'prop-types';
import Userinfo from './userinfo';

 /**
 * @FileOverview A class that renders master template of the application.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */

class Layout extends React.Component {
   /**
   * Render the component content
   * @return {null} Return no value.
  */
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
                <li>
                  <Userinfo />
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

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]).isRequired
};
export default Layout;
