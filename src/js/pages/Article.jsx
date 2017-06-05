import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import * as Utilties from '../utilities/utilities';
import firebase from '../utilities/firebase';
import Notification from '../action/notifyAction';
import FavouriteAction from '../action/favouriteAction';

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

/**
 * @FileOverview A class that renders Article
 * and emit a change.
 *  @extends React.Component
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class Article extends React.Component {
  /** Create Articles object  */
  constructor() {
    super();

     /**
     * Add an article to the user favourite list and update the favourite count
     * @param {object} e The object that trigger the event
     * @return {null} Return no value.
    */
    this.addArticle = ((e) => {
      const index = e.target.value;
      const articles = JSON.parse(localStorage.getItem('articles'));
      const article = articles[index];
      article.source = this.props.source;

      // get user email from local storage
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
        .email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));
      const FavouriteAddress = `/user/${userEmail}/favourite`;
      const FavouriteRef = firebase.database().ref(FavouriteAddress);

      // add article to user favourite list in firebase
      FavouriteRef.push(article)
        .then(() => {
          Notification('Headlines has been successfully added to favourites.');
          FavouriteAction(1);

          // hide the button
          const buttonID = `btnAddToFav${index}`;
          document.getElementById(buttonID).style.display = 'none';
        })
        .catch((err) => {
          Notification(`Error occurred, ${err}`);
        });
    });

    /**
     * Add an article to the user favourite list and update the favourite count
     * @param {object} e The object that trigger the event
     * @return {null} Return no value.
    */
    this.removeArticle = ((e) => {
      // get the key of the article in firebase
      const articleKey = e.target.value;
      // get the id of the article container
      const divId = `artcile${e.target.id}`;

      // get user email from local storage
      let userEmail = JSON.parse(localStorage.getItem('userProfile'))
        .email.toString().replace('.', '_');
      userEmail = userEmail.substring(0, userEmail.indexOf('@'));

      // create the article ref
      const articleAddress = `/user/${userEmail}/favourite/${articleKey}`;
      const artcileRef = firebase.database().ref(articleAddress);
      // remove the article from firebase
      artcileRef.remove()
      .then(() => {
        Notification('Article has been successfully removed from favourites.');
        FavouriteAction(-1);

        // hide the article container
        document.getElementById(divId).style.display = 'none';
      })
      .catch((err) => {
        Notification(`Error occurred, ${err}`);
      });
    });

     /**
     * convert article time to server time zone
     * @param {object} time The object that trigger the event
     * @return {string} Return the date in server time zone.
    */
    this.toServertime = ((time) => {
      let currentTime = new Date(time).toString();
      currentTime = currentTime.substring(0, currentTime.indexOf('G'));
      return currentTime;
    });
  }

  /**
   * Render the component content
   * @return {null} Return no value.
  */
  render() {
    // create the add favourite button ID
    const addFavBtnID = `btnAddToFav${this.props.id}`;
    const divID = `artcile${this.props.id}`;

    return (
      <div className="col s12 m12 l12 shadow  hoverable" id={divID}>
        <div className="article-content">
          <h6 className="header">
            <span className="articleHeader">
              {(this.props.author) ? `${this.props.author}:  ` : ''}
              {this.props.title}
            </span>
          </h6>
          <div className="card horizontal">
            <div className="card-image">
              {(this.props.urlToImage) ?
                <img
                  className="imgStyle" src={this.props.urlToImage}
                  alt="No news image"
                />
                :
                <img
                  src="https://placehold.it/800x400?text=CompleteNEWS"
                  alt="Image"
                  className="imgStyle"
                />
              }
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p className="paragraphstyle">
                  {Utilties.replaceLinks(this.props.description)}
                </p>
              </div>
              <div className="card-action">
                <p>
                  {
                    (this.props.publishedAt)
                    ?
                    `Published on ${this.toServertime(this.props.publishedAt)}`
                    :
                    ''
                  }
                </p>
                <a
                  href={this.props.url} target="_blank" rel="noopener noreferrer"
                >
                  {(this.props.url) ? `Read on  ${this.props.source} ` : ''}</a>
                <button
                  className="waves-effect waves-light"
                  value={this.props.id} onClick={this.props.scrape}
                  title="view full story"
                > Read more
                </button>
                {(this.props.isAuth) ?
                  <button
                    id={addFavBtnID}
                    value={this.props.id} onClick={this.addArticle}
                    className="waves-effect waves-light"
                    title="Add to favourite"
                  >
                  Add to favourite
                </button>
                :
                ''
                }
                {(this.props.firebaseKey) ?
                  <button
                    id={this.props.id}
                    value={this.props.firebaseKey} onClick={this.removeArticle}
                    className="waves-effect waves-light"
                    title="Add to favourite"
                  >
                  Delete favourite
                </button>
                :
                ''
                }
                <div className="col m12" style={{ paddingLeft: '0px', paddingTop: '10px' }}>
                  <div className="col m2" style={{ paddingLeft: '0px' }}>
                    <FacebookShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                  </div>
                  <div className="col m2" style={{ paddingLeft: '0px' }}>
                    <LinkedinShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                  </div>
                  <div className="col m2" style={{ paddingLeft: '0px' }}>
                    <TwitterShareButton
                      url={this.props.url} title={this.props.title}
                    >
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                  </div>
                  <div className="col m2" style={{ paddingLeft: '0px' }}>
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
  scrape: PropTypes.func.isRequired,
  firebaseKey: PropTypes.string,
};

Article.defaultProps = {
  author: '',
  title: '',
  urlToImage: '',
  description: '',
  publishedAt: '',
  url: '',
  firebaseKey: ''
};

export default Article;
