import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../utilities/firebase';


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
    let userEmail = JSON.parse(localStorage.getItem('userProfile')).email.toString().replace('.', '_');
    userEmail = userEmail.substring(0, userEmail.indexOf('@'));
    const FavouriteAddress = `/user/${userEmail}/favourite`;
    const FavouriteRef = firebase.database().ref(FavouriteAddress);
    FavouriteRef.push(article)
    .then((snapshot) => {
      // console.log(snapshot);
    })
    .catch((err) => {
      // console.log(err);
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
            {(this.props.author) ? `${this.props.author}:  ` : ''} {this.props.title}
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
              <p>{(this.props.publishedAt) ? `Published on  ${this.toServertime(this.props.publishedAt)}` : ''} </p>
              <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                {(this.props.url) ? `Read on site ${this.props.source} ` : ''}</a>
              <button
                value={this.props.id} onClick={this.addArticle}
                className="btn-floating btn-small waves-effect waves-light red" 
                title="Add to favourite"
              >
                <i value={this.props.id} className="material-icons">+</i>
              </button>
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
