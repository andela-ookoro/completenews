
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * set the articles to an empty array
 * @param {int} i - An option array; which would be added to the favourite
 * articles count
 * @return {object } Return nothing.
*/
const setFavouriteArticles = (i = 0) => {
  let favouriteCount = JSON.stringify(localStorage.getItem('favourite'));
  const favouriteArray = favouriteCount.split(']');
  favouriteCount = favouriteArray.length + i;
  Dispatcher.dispatch({
    Type: Constant.GET_FAVOURITE_COUNT,
    favouriteCount,
  });
};

export default setFavouriteArticles;
