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

export const getHeadlines = ((source, sort) => {
  let apiURl = '';
  if (sort === '') {
    apiURl = `https://newsapi.org/v1/articles?source=${source
            }&apiKey=213327409d384371851777e7c7f78dfe`;
  } else {
    apiURl = `https://newsapi.org/v1/articles?source=${source
            }&sortBy=${sort
            }&apiKey=213327409d384371851777e7c7f78dfe`;
  }
  return new Promise((resolve, reject) => {
    axios.get(apiURl)
    .then((response) => {
      resolve(response.data.articles);
    }).catch((error) => {
      reject(`Error occurred, ${error}`);
    });
  });
});

export const getDbHeadlines = (email =>
  new Promise((resolve, reject) => {
    firebase.database().ref(`/user/${email}/favourite`).once('value')
    .then((snapshot) => {
      const headlines = [];
      const dbSnapshot = snapshot.val();
      Object.keys(dbSnapshot).forEach((key) => {
        headlines.push(dbSnapshot[key]);
      });
      resolve(headlines);
    })
    .catch((error) => {
      reject(`Error occurred, ${error}`);
    });
  })
 );

