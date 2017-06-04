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
      if (error.toString().includes('400')) {
        reject(`Error occurred, No article found. Check the source or sort
        option select`);
      } else {
        reject(`Errorsk  occurred, ${error}`);
      }
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

const Linkify = ((str) => {
  // get the last sectio of the link
  let str1 = str.match(/[\/][a-zA-Z0-9]*/g).pop();

  if (str1 === '/') {
    str1 = str.match(/[\.][a-zA-Z0-9]*[\.]/g).pop();
    str1 = str1.substr(1, str1.length - 2);
  } else {
    str1 = str1.substr(1, str1.lenght);
  }

  // create the link
  return `<a href="${str}" target="_blank" >${str1}</a>`;
});

export const replaceLinks = (str =>
  str.replace(/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/gi,
    (x => Linkify(x)))
);