import React from 'react';
import GoogleLogin from 'react-google-login';
import firebase from '../utilities/firebase';
import AuthAction from '../action/authAction';
import Notification from '../action/notifyAction';
import NotificationStore from '../store/NotifyStore';

/**
 * @FileOverview A class that renders login metadata
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class Login extends React.Component {
  /** Create Login object  */
  constructor() {
    super();
    this.state = { message: '' };
    this.notifyUser = this.notifyUser.bind(this);
    /**
     * authenticate user, if user is not registered; a user object is created
     * @param {object} response The reponse recieved from google
     * @return {null} Return no value.
    */
    this.authenticate = ((response) => {
      if (response) {
        const userProfile = response.profileObj;
        let userEmail = userProfile.email;
        userEmail = userEmail.substring(0, userEmail.indexOf('@'));
        userEmail = userEmail.replace('.', '_');

        const userinfo = {
          'email': userProfile.email,
          'name': userProfile.name,
          'imageUrl': userProfile.imageUrl,
          'userEmail': userEmail,
        };

        localStorage.setItem('userProfile', JSON.stringify(userinfo));
        const userRef = firebase.database().ref('/user');

        userRef.once('value')
        .then((snapshot) => {
          if (snapshot.hasChild(userEmail)) {
            AuthAction(true, userinfo);
            window.location = '/#/headlines';
          } else {
            const user = {
              email: userProfile.email,
              name: userProfile.name,
              imageUrl: userProfile.imageUrl,
              favourite: [],
            };
            userRef.child(userEmail).set(user)
            .then(() => {
              AuthAction(true, userinfo);
              window.location = '/#/headlines';
            })
            .catch((err) => {
              Notification(`Error occurred, ${err}`);
            });
          }
        }).catch((err) => {
          Notification(`Error occurred, ${err}`);
        });
      }
    });
  }

  /**
   * called when the component is ready to render its content
   * @return {null} Return no value.
  */
  componentWillMount() {
    NotificationStore.on('change', this.notifyUser);
  }

  /**
   * called when the component  remove its content
   * @return {null} Return no value.
  */
  componentWillUnmount() {
    NotificationStore.removeListener('change', this.notifyUser);
  }

  /**
   * set the message state variable when the NotificationStore emit change
   * @return {null} Return no value.
  */
  notifyUser() {
    this.setState({ message: NotificationStore.message });
  }

  /**
   * Render the component content
   * @return {null} Return no value.
  */
  render() {
    return (
      <div className="center_content">
        <div>
          <p> <i className="material-icons prefix">account_circle</i> </p>
          <p> {this.state.message} </p>
        </div>
        <GoogleLogin
          clientId={process.env.GOOGLE_KEY}
          onSuccess={this.authenticate}
          onFailure={this.authenticate}
          tag="span"
          disabled="false"
        >
          <span id="googlebtn" className="btn waves-effect waves-light">
             Login with Google
           </span>
        </GoogleLogin>
      </div>
    );
  }

}

export default Login;
