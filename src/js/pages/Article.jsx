import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import firebase from '../utilities/firebase';
import Notification from '../action/notifyAction';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

class Article extends React.Component {
  constructor() {
    super();
    this.addArticle = this.addArticle.bind(this);
    this.toServertime = this.toServertime.bind(this);
  }

  addArticle(e) {
    const index = e.target.getAttribute('value');
    const articles = JSON.parse(localStorage.articles);
    const article = articles[index];
    //  const timestamp = new Date().valueOf();
    let userEmail = JSON.parse(localStorage.getItem('userProfile'))
      .email.toString().replace('.', '_');
    userEmail = userEmail.substring(0, userEmail.indexOf('@'));
    const FavouriteAddress = `/user/${userEmail}/favourite`;
    const FavouriteRef = firebase.database().ref(FavouriteAddress);
    FavouriteRef.push(article)
      .then(() => {
        // console.log(snapshot);
      })
      .catch((err) => {
        Notification(`Error occurred, ${err}`);
      });
    // console.log(articles[index]);
    // console.log(timestamp);
  }

  toServertime(time) {
    let test = new Date(time).toString();
    test = test.substring(0, test.indexOf('G'));
    return test;
  }


  render() {
    const imgStyle = {
      width: '80%',
      height: '40%',
    };
    const paragraphstyle = {
      width: '80%',
    };

    return (
      <div className="col s12 m7 l12  hoverable">
        <h6 className="header">
          <span className={paragraphstyle} >
            {(this.props.author) ? `${this.props.author}:  ` : ''}
            {this.props.title}
          </span>
        </h6>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className={imgStyle} src={this.props.urlToImage}
              alt="No news image"
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p className={paragraphstyle}>{this.props.description}</p>
            </div>
            <div className="card-action">
              <p>
                {
                  (this.props.publishedAt)
                  ?
                  `Published on  ${this.toServertime(this.props.publishedAt)}`
                  :
                  ''
                }
              </p>
              <a
                href={this.props.url} target="_blank" rel="noopener noreferrer"
              >
                {(this.props.url) ? `Read on  ${this.props.source} ` : ''}</a>
              <button
                value={this.props.id} onClick={this.addArticle}
                className={`btn-floating btn-small waves-effect waves-light red 
                  ${(this.props.isAuth) ? '' : 'disabled'}`}
                title="Add to favourite"
              >
                <i value={this.props.id} className="material-icons">+</i>
              </button>
              <div className="container" >
                <div className="Row">
                  <div className="col m2">
                    <FacebookShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                  </div>
                  <div className="col m2">
                    <LinkedinShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                  </div>
                  <div className="col m2">
                    <TwitterShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                  </div>
                  <div className="col m2">
                    <GooglePlusShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <GooglePlusIcon size={32} round={true} />
                    </GooglePlusShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


Article.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string,
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string,
  url: PropTypes.string,
  source: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

Article.defaultProps = {
  author: '',
  title: '',
  urlToImage: '',
  description: '',
  publishedAt: '',
  url: '',
};

export default Article;
