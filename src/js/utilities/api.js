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
