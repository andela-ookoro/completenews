import axios from 'axios';


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
  if (response.status !== 200) {
    cb('error');
  } else {
    cb(response.data.articles);
  }
});
};
