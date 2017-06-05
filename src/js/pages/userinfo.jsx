import React from 'react';
import { Link } from 'react-router';
import * as ArticlesAction from '../action/articleAction';
import AuthAction from '../action/authAction';
import AuthStore from '../store/authStore';
import FavouriteStore from '../store/favouriteStore';
import FavouriteAction from '../action/favouriteAction';
import firebase from '../utilities/firebase';

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
      favouriteCount: 0
    };

    // get user email from local storage
    if (this.state.isAuth) {
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
        .email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));

      // create the user favourite article ref
      const favArticleAddress = `/user/${userEmail}/favourite`;
      const favArticleRef = firebase.database().ref(favArticleAddress);
      console.log(favArticleAddress);
      // update the favourite count when an article is added
      favArticleRef.on('child_added', () => {
        this.setState({
          favouriteCount: this.state.favouriteCount + 1
        });
      });

      // update the favourite count when an article is deteled
      favArticleRef.on('child_removed', () => {
        this.setState({
          favouriteCount: this.state.favouriteCount - 1
        });
      });
    }

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

    // set the user in logged in
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
    let currentCount = this.state.favouriteCount;
    const storeCount = FavouriteStore.count;

    // check if it is not the initial state
    if (storeCount === 1 || storeCount === -1) {
      currentCount += storeCount;
    } else {
      currentCount = storeCount;
    }
    this.setState({ favouriteCount: currentCount });
  }

  /**
   * set the localstorage value for userprofile to null
   * set userInfo to null and the isAuth status to null
   * reset the articles store
   * @return {null} Return no value.
  */
  signout() {
    localStorage.setItem('userProfile', null);
    this.setState({ UserInfo: {}, isAuth: false, favouriteCount: 0 });
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
