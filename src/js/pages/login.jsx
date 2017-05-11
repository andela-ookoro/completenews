import React from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import firebase from '../utilities/firebase';
import * as HeadlineAction from '../action/headlineAction';
import AuthAction from '../action/authAction';
import Notification from '../action/notifyAction';


class Login extends React.Component {
  constructor() {
    super();
    this.responseGoogle = this.responseGoogle.bind(this);
    this.state = { email: '', name: '', imageUrl: '' };
    this.signout = this.signout.bind(this);
    this.viewFavourite = this.viewFavourite.bind(this);
  }
  responseGoogle(response) {
    const userProfile = response.profileObj;
    let userEmail = userProfile.email;
    userEmail = userEmail.substring(0, userEmail.indexOf('@')).replace('.', '_');
    localStorage.setItem('userProfile', JSON.stringify(response.profileObj));
    this.setState({
      email: userProfile.email,
      name: userProfile.name,
      imageUrl: userProfile.imageUrl,
    });
    const userRef = firebase.database().ref('/user');
    userRef.once('value')
    .then((snapshot) => {
      if (snapshot.hasChild(userEmail)) {
        // console.log('exists');
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
        .catch((err) => {
           Notification(`Error occurred, ${err}`);
        });
      }
      AuthAction(true);
    }).catch((err) => {
      Notification(`Error occurred, ${err}`);
    });
    //  console.log(this.state);
   //  console.log(response.profileObj);
  }

  signout() {
    localStorage.setItem('userProfile', null);
    this.setState({
      email: '',
      name: '',
      imageUrl: '',
    });
    HeadlineAction.resetHeadlines();
    AuthAction(false);
  }

  viewFavourite() {
    let userEmail = JSON.parse(localStorage.getItem('userProfile')).email.toString().replace('.', '_');
    userEmail = userEmail.substring(0, userEmail.indexOf('@'));
    HeadlineAction.getDbHeadlines(userEmail);
  }

  render() {
    return (
       (this.state.email === '') ?
         <GoogleLogin
           clientId="21466984743-0jkg4qsshao5t2cahrr8obm9r3sqqaa4.apps.googleusercontent.com"
           onSuccess={this.responseGoogle}
           onFailure={this.responseGoogle}
           loginHint="Sign to personalize articles"
         >
           <span> Login with Google</span>
         </GoogleLogin>
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
             <img src={this.state.imageUrl} alt="Contact Person" />
             {this.state.name}
             <a className="btn-flat" onClick={this.signout}>Sign Out</a>
           </div>
         </div>
    );
  }

}

export default Login;
