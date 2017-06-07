
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * dispatches the user favourite article count
 * @param {int} i - An option array; which would be added to the favourite
 * articles count
 * @return {object } Return nothing.
*/
const favouriteAction = (i = 0) => {
  // check if variable exist
  let favourites = [];
  if (localStorage.getItem('favoutireArticles')) {
    favourites = JSON.parse(localStorage.getItem('favoutireArticles'));
  }

  if (i === 0) {
    const favouriteCount = favourites.length;
    Dispatcher.dispatch({
      Type: Constant.GET_FAVOURITE_COUNT,
      favouriteCount,
      countchange: false
    });
  } else {
    Dispatcher.dispatch({
      Type: Constant.GET_FAVOURITE_COUNT,
      favouriteCount: i,
      countchange: true
    });
  }
};
export default favouriteAction;
