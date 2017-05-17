import React from 'react';
import { Link } from 'react-router';
import * as HeadlineAction from '../action/headlineAction';
import AuthAction from '../action/authAction';
import AuthStore from '../store/authStore';
import FavouriteCountStore from '../store/favouriteStore';
import FavouriteCountAction from '../action/favourite';

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = { UserInfo: {}, isAuth: false, favouriteCount: FavouriteCountStore.count };
    this.signout = this.signout.bind(this);
    this.viewFavourite = (() => {
      let userEmail = JSON.parse(localStorage.getItem('userProfile')).email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      HeadlineAction.getDbHeadlines(userEmail);
    });
    this.UpdateUserInfo = this.UpdateUserInfo.bind(this);
    this.UpdateCount = this.UpdateCount.bind(this);
  }
  componentWillMount() {
    FavouriteCountStore.on('change', this.UpdateCount);
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    if (userinfo) {
      this.setState({ UserInfo: userinfo, isAuth: true });
    }
    FavouriteCountAction();
    AuthStore.on('change', this.UpdateUserInfo);
  }
  componentWillUnmount() {
    AuthStore.removeListener('change', this.UpdateUserInfo);
    FavouriteCountStore.removeListener('change', this.UpdateCount);
  }
  UpdateUserInfo() {
    this.setState({ UserInfo: AuthStore.userinfo, isAuth: AuthStore.isAuth });
  }
  UpdateCount() {
    this.setState({ favouriteCount: FavouriteCountStore.count });
  }
  signout() {
    localStorage.setItem('userProfile', null);
    this.setState({ UserInfo: {}, isAuth: false });
    HeadlineAction.resetHeadlines();
    AuthAction(false, {});
  }


  render() {
    return (
      (!this.state.isAuth) ?
        <Link to="/login" >Click to login</Link>
        :
        <div>
          <button
            id="viewfavouritebtn"
            onClick={this.viewFavourite} title="view favourite headline"
          > Favourite Headlines ({this.state.favouriteCount})
                </button>
          <div className="chip">
            <img src={this.state.UserInfo.imageUrl} alt="Contact Person" />
            {this.state.UserInfo.name}
          </div>
          <a className="btn-flat" onClick={this.signout}>Sign Out</a>
        </div>
    );
  }

}

export default UserInfo;
