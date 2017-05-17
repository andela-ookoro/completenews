import React from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import firebase from '../utilities/firebase';
import AuthAction from '../action/authAction';
import Notification from '../action/notifyAction';
import NotifyStore from '../store/NotifyStore';


class Login extends React.Component {
  constructor() {
    super();
    this.state = { message: '' };
    this.notifyUser = this.notifyUser.bind(this);
    this.responseGoogle = ((response) => {
      if (response) {
        const userProfile = response.profileObj;
        let userEmail = userProfile.email;
        userEmail = userEmail.substring(0,
          userEmail.indexOf('@')).replace('.', '_');
        const userinfo = {
          'email': userProfile.email,
          'name': userProfile.name,
          'imageUrl': userProfile.imageUrl,
          'userEmail': userEmail,
        };
        // console.log(userEmail);
        localStorage.setItem('userProfile', JSON.stringify(userinfo));
        const userRef = firebase.database().ref('/user');
        userRef.once('value')
        .then((snapshot) => {
          if (snapshot.hasChild(userEmail)) {
            AuthAction(true, userinfo);
            window.location = '/#/headlines';
            // hashHistory.push('/headlines');
          } else {
            const user = {
              email: userProfile.email,
              name: userProfile.name,
              imageUrl: userProfile.imageUrl,
              favourite: [
                {
                  'author': 'Abhimanyu Ghoshal',
                  'description': 'After a failed effort to offer free internet' +
                    'access (with strings attached) to people in India,' +
                      'Facebook has now launched Express Wi-Fi, a service that' +
                      'lets users log on to Wi-Fi networks ...',
                  'publishedAt': '2017-05-04T13:18:36Z',
                  'title': 'Facebook launches Express Wi-Fi in India to bring' +
                    'rural areas online',
                  'url': 'https://thenextweb.com/facebook/2017/05/04/facebook-' +
                    'launches-express-wi-fi-in-india-to-bring-rural-areas-online/',
                  'urlToImage': 'https://cdn2.tnwcdn.com/wp-content/blogs.dir/' +
                    '1/files/2017/05/Facebook-Express-Wi-Fi.jpg',
                },
              ],
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
  componentWillMount() {
    NotifyStore.on('change', this.notifyUser);
  }

  componentWillUnmount() {
    NotifyStore.removeListener('change', this.notifyUser);
  }
  notifyUser() {
    this.setState({ message: NotifyStore.message });
  }


  render() {
    return (
      <div className="center_content">
        <div>
          <p> <i className="material-icons prefix">account_circle</i> </p>
          <p> {this.state.message} </p>
        </div>
        <GoogleLogin
          clientId={process.env.GOOGLE_KEY}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          tag="span"
          disabled="false"
        >
          <span id="googlebtn" className="btn waves-effect waves-light"> Login with Google</span>
        </GoogleLogin>
      </div>
    );
  }

}

export default Login;
