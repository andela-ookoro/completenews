import axios from 'axios';
import firebase from './firebase';

export const getSources = (cb) => {
  axios.get('https://newsapi.org/v1/sources?language=en')
.then((response) => {
  if (response.status !== 200) {
    cb('error');
  } else {
    cb(response.data.sources);
  }
});
};


export const getHeadlines = (source, sort, cb) => {
  let apiURl = '';
  if (sort === '') {
    apiURl = `https://newsapi.org/v1/articles?source=${source
            }&apiKey=213327409d384371851777e7c7f78dfe`;
  } else {
    apiURl = `https://newsapi.org/v1/articles?source=${source
            }&sortBy=${sort
            }&apiKey=213327409d384371851777e7c7f78dfe`;
  }

  axios.get(apiURl)
.then((response) => {
  // console.log(response);
  if (response.statusText !== 'OK') {
    cb('error', null);
  } else {
    cb(null, response.data.articles);
  }
}).catch(() => {
  cb('error', null);
});
};

export const getDbHeadlines = (email, cb) => {
  firebase.database().ref(`/user/${email}/favourite`).once('value')
  .then((snapshot) => {
    const headlines = [];
    const dbSnapshot = snapshot.val();
    Object.keys(dbSnapshot).forEach((key) => {
      headlines.push(dbSnapshot[key]);
    });
    cb(null, headlines);
  })
  .catch(() => {
    cb('error', null);
  });
};
