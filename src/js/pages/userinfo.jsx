import React from 'react';
import { Link } from 'react-router';
import * as HeadlineAction from '../action/headlineAction';
import AuthAction from '../action/authAction';
import AuthStore from '../store/authStore';


class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = { UserInfo: {}, isAuth: false };
    this.signout = this.signout.bind(this);
    this.viewFavourite = this.viewFavourite.bind(this);
    this.UpdateUserInfo = this.UpdateUserInfo.bind(this);
  }
  componentWillMount() {
    const userinfo = JSON.parse(localStorage.getItem('userProfile'));
    if (userinfo) {
      this.setState({ UserInfo: userinfo, isAuth: true });
    }
    AuthStore.on('change', this.UpdateUserInfo);
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.UpdateUserInfo);
  }
  UpdateUserInfo() {
    this.setState({ UserInfo: AuthStore.userinfo, isAuth: AuthStore.isAuth });
  }
  signout() {
    localStorage.setItem('userProfile', null);
    this.setState({ UserInfo: {}, isAuth: false });
    HeadlineAction.resetHeadlines();
    AuthAction(false, {});
  }

  viewFavourite() {
    let userEmail = JSON.parse(localStorage.getItem('userProfile')).email.toString().replace('.', '_');
    userEmail = userEmail.substring(0, userEmail.indexOf('@'));
    HeadlineAction.getDbHeadlines(userEmail);
  }

  render() {
    return (
       (!this.state.isAuth) ?
         <Link to="/login" >Click to login</Link>
          :
         <div>
            <button
                onClick={this.viewFavourite}
                className="btn-floating btn-small waves-effect waves-light"
                title="view favourite"
              >
                <i className="large material-icons">stars</i>
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
