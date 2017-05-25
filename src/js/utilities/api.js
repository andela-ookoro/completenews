import axios from 'axios';
import firebase from './firebase';

export const getSources = () =>
  new Promise((resolve, reject) => {
    axios.get('https://newsapi.org/v1/sources?language=en')
    .then((response) => {
      resolve(response.data.sources);
    })
    .catch((error) => {
      reject(`Error occurred, ${error}`);
    });
  });

export const getArticles = ((source, sort) => {
  let sortBy = '';
  if (sort !== '') {
    sortBy = `&sortBy=${sort}`;
  }
  const apiURl = `https://newsapi.org/v1/articles?source=${source}${sortBy
                  }&apiKey=${process.env.NEWSAPI_KEY}`;
  return new Promise((resolve, reject) => {
    axios.get(apiURl)
    .then((response) => {
      resolve(response.data.articles);
    }).catch((error) => {
      reject(`Error occurred, ${error}`);
    });
  });
});

export const getFavouriteArticles = (email =>
  new Promise((resolve, reject) => {
    firebase.database().ref(`/user/${email}/favourite`).once('value')
    .then((result) => {
      const articles = [];
      const dbArticles = result.val();
      Object.keys(dbArticles).forEach((key) => {
        articles.push(dbArticles[key]);
      });
      resolve(articles);
    })
    .catch((error) => {
      reject(`Error occurred, ${error}`);
    });
  })
 );

