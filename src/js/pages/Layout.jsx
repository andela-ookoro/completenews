import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './userinfo';
import * as Source from './headlines/SourceOptions';

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
        <div className="col s12 m12 l12" id="header">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Complete News</a>
              <a
                href="#" data-activates="mobile-demo" className="button-collapse"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <UserInfo />
                </li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><UserInfo /></li>
                <li> <Source.sources /></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col s12 m12 l12">
          { this.props.children }
        </div>
        <div className="col s12 m12 l12">
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

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]).isRequired
};
export default Layout;
