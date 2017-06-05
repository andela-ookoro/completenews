
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * dispatches the user favourite article count
 * @param {int} i - An option array; which would be added to the favourite
 * articles count
 * @return {object } Return nothing.
*/
const favouriteAction = (i = 0) => {
  const favourites = JSON.parse(localStorage.getItem('favoutireArticles'));

  if (favourites && i === 0) {
    const favouriteCount = favourites.length;
    console.log(favouriteCount);
    Dispatcher.dispatch({
      Type: Constant.GET_FAVOURITE_COUNT,
      favouriteCount,
    });
  } else {
    Dispatcher.dispatch({
      Type: Constant.GET_FAVOURITE_COUNT,
      favouriteCount: i,
    });
  }
};
export default favouriteAction;
