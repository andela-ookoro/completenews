
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const GETFAVOURITE = (i = 0) => {
  let favouriteCount = JSON.stringify(localStorage.getItem('favourite'));
  const favouriteArray = favouriteCount.split(']');
  favouriteCount = favouriteArray.length + i;
  Dispatcher.dispatch({
    Type: Constant.GETFAVOURITE_COUNT,
    favouriteCount,
  });
};

export default GETFAVOURITE;
