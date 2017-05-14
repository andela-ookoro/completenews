import React from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { hashHistory } from 'react-router';
import firebase from '../utilities/firebase';
import AuthAction from '../action/authAction';
import Notification from '../action/notifyAction';
import NotifyStore from '../store/NotifyStore';


class Login extends React.Component {
  constructor() {
    super();
    this.state = { message: '' };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
  }
  componentWillMount() {
    NotifyStore.on('change', this.notifyUser);
  }

  componentWillUnmount() {
    NotifyStore.removeListener('change', this.notifyUser);
  }
  notifyUser() {
    this.setState({ message: NotifyStore.message });
  }
  responseGoogle(response) {
    const userProfile = response.profileObj;
    let userEmail = userProfile.email;
    userEmail = userEmail.substring(0, userEmail.indexOf('@')).replace('.', '_');
    const userinfo = {
      "email": userProfile.email,
      "name": userProfile.name,
      "imageUrl": userProfile.imageUrl,
      "userEmail" : userEmail,
    };
    localStorage.setItem('userProfile', JSON.stringify(userinfo));
    const userRef = firebase.database().ref('/user');
    userRef.once('value')
    .then((snapshot) => {
      if (snapshot.hasChild(userEmail)) {
        AuthAction(true, userinfo);
        window.location = "/#/headlines";
        // hashHistory.push('/headlines');
      } else {
        const user = {
          email: userProfile.email,
          name: userProfile.name,
          imageUrl: userProfile.imageUrl,
          favourite: [
            {
              'author': "Abhimanyu Ghoshal",
              'description': "After a failed effort to offer free internet access (with strings attached) to people in India, Facebook has now launched Express Wi-Fi, a service that lets users log on to Wi-Fi networks ...",
              'publishedAt': "2017-05-04T13:18:36Z",
              'scrapeDetails': "After a failed effort to offer free internet access (with strings attached) to people in India, Facebook has now launched Express Wi-Fi, a service that lets users log on to Wi-Fi networks ",
              'title': "Facebook launches Express Wi-Fi in India to bring rural areas online",
              'url': "https://thenextweb.com/facebook/2017/05/04/facebook-launches-express-wi-fi-in-india-to-bring-rural-areas-online/",
              'urlToImage': "https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/05/Facebook-Express-Wi-Fi.jpg"
            },
          ],
        };
        userRef.child(userEmail).set(user)
        .then(() => {
          AuthAction(true, userinfo);
          hashHistory.push('/headlines')
        })
        .catch((err) => {
          Notification(`Error occurred, ${err}`);
        });
      }
    }).catch((err) => {
      Notification(`Error occurred, ${err}`);
    });
    //  console.log(this.state);
   //  console.log(response.profileObj);
  }

  render() {
    return (
      <div className="centerdiv">
        <p> <i className="material-icons prefix">account_circle</i>  </p>
        <p> {this.state.message} </p>
        <GoogleLogin
          clientId="21466984743-0jkg4qsshao5t2cahrr8obm9r3sqqaa4.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          loginHint="Sign to personalize articles"
        >
          <span> Login with Google</span>
        </GoogleLogin>
      </div>
    );
  }

}

export default Login;
