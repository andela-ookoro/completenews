import React from 'react';
import { Link } from 'react-router';
import * as ArticlesAction from '../action/headlineAction';
import AuthAction from '../action/authAction';
import AuthStore from '../store/authStore';
import FavouriteStore from '../store/favouriteStore';
import FavouriteAction from '../action/favourite';

/**
 * @FileOverview A class that renders user metadata
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class UserInfo extends React.Component {
  /** Create UserInfo object  */
  constructor() {
    super();
    this.state = {
      UserInfo: {},
      isAuth: false,
      favouriteCount: FavouriteStore.count
    };
    this.signout = this.signout.bind(this);
    this.viewFavourite = (() => {
      let userEmail = JSON.parse(localStorage.getItem('userProfile'));
      userEmail = userEmail.email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      ArticlesAction.getFavouriteArticles(userEmail);
      // check if user is viewing the headline page else redirect
      const url = window.location.href.toString();
      if (!url.includes('headlines')) {
        window.location = '/#/headlines';
      }
    });
    this.UpdateUserInfo = this.UpdateUserInfo.bind(this);
    this.UpdateCount = this.UpdateCount.bind(this);
  }

  /**
   * called when the component is ready to render its content
   * @return {null} Return no value.
  */
  componentWillMount() {
    FavouriteStore.on('change', this.UpdateCount);
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    if (userinfo) {
      this.setState({ UserInfo: userinfo, isAuth: true });
    }
    FavouriteAction();
    AuthStore.on('change', this.UpdateUserInfo);
  }

  /**
   * called when the component  remove its content
   * @return {null} Return no value.
  */
  componentWillUnmount() {
    AuthStore.removeListener('change', this.UpdateUserInfo);
    FavouriteStore.removeListener('change', this.UpdateCount);
  }

  /**
   * set the state variable when the UserInfo store emit a change
   * @return {null} Return no value.
  */
  UpdateUserInfo() {
    this.setState({ UserInfo: AuthStore.userinfo, isAuth: AuthStore.isAuth });
  }

  /**
   * set the state variable when the UserInfo store emit a change
   * @return {null} Return no value.
  */
  UpdateCount() {
    this.setState({ favouriteCount: FavouriteStore.count });
  }

  /**
   * set the localstorage value for userprofile to null
   * set userInfo to null and the isAuth status to null
   * reset the articles store
   * @return {null} Return no value.
  */
  signout() {
    localStorage.setItem('userProfile', null);
    this.setState({ UserInfo: {}, isAuth: false });
    ArticlesAction.resetArticles();
    AuthAction(false, {});
  }

  /**
   * Render the component content
   * @return {null} Return no value.
  */
  render() {
    return (
      (!this.state.isAuth) ?
        <Link to="/login" >Click to login</Link>
        :
        <div>
          <button
            id="viewfavouritebtn"
            onClick={this.viewFavourite} title="view favourite headline"
          > Favourite Articles ({this.state.favouriteCount})
                </button>
          <a className="btn-flat" onClick={this.signout}>Sign Out</a>
          <div className="chip">
            {(this.state.UserInfo.imageUrl)
            ?
              <img src={this.state.UserInfo.imageUrl} alt="Contact Person" />
            :
              <i className="large material-icons">perm_identity</i>
            }
            {this.state.UserInfo.name}
          </div>
        </div>
    );
  }

}

export default UserInfo;
