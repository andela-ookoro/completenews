import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
// class to show article
const config = {
  apiKey: 'AIzaSyBRVO8XJcSp9EaxRRlsH5DKMILYygEUL3Y',
  authDomain: 'completenews-3a553.firebaseapp.com',
  databaseURL: 'https://completenews-3a553.firebaseio.com',
  projectId: 'completenews-3a553',
  storageBucket: 'completenews-3a553.appspot.com',
  messagingSenderId: '21466984743',
};
firebase.initializeApp(config);

class Article extends React.Component {
  constructor() {
    super();
    this.addArticle = this.addArticle.bind(this);
  }

  addArticle(e) {
    const index = e.target.value;
    const articles = JSON.parse(localStorage.articles);
    const artilce = articles[index];
    const timestamp = new Date();
    const test = {
			"author": "Abhimanyu Ghoshal",
			"title": "Facebook launches Express Wi-Fi in India to bring rural areas online",
			"description": "After a failed effort to offer free internet access (with strings attached) to people in India, Facebook has now launched Express Wi-Fi, a service that lets users log on to Wi-Fi networks ...",
			"url": "https://thenextweb.com/facebook/2017/05/04/facebook-launches-express-wi-fi-in-india-to-bring-rural-areas-online/",
			"urlToImage": "https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/05/Facebook-Express-Wi-Fi.jpg",
			"publishedAt": "2017-05-04T13:18:36Z",
			"scrapeDetails":"After a failed effort to offer free internet access (with strings attached) to people in India, Facebook has now launched Express Wi-Fi, a service that lets users log on to Wi-Fi networks "
		};
    firebase.database().ref('/article').child(timestamp).set(test);
    console.log(articles[index]);
    console.log(timestamp);
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
      <div className="col s12 m7 l12">
        <h6 className="header">
          <span className={paragraphstyle} >
            {(this.props.author) ? this.props.author + ': ': ''} {this.props.title}
          </span>
        </h6>
        <div className="card horizontal">
          <div className="card-image">
            <img className={imgStyle} src={this.props.urlToImage} alt="No news image" />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p className={paragraphstyle}>{this.props.description}</p>
            </div>
            <div className="card-action">
              <span>{(this.props.publishedAt) ?'Published on ' + this.props.publishedAt : ''} </span>
              <a href={this.props.url} target="_blank" rel="noopener noreferrer">{(this.props.url) ? 'Read on site ' : ''}</a>
              <button value={this.props.id} onClick={this.addArticle} > Add to db</button>
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
};

export default Article;
