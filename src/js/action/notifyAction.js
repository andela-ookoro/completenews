import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * dispatch a messah=ge
 * @param {string} message - the message that should be dispatched
 * @return {string } Return nothing.
*/
const getNotification = (message) => {
  Dispatcher.dispatch({
    Type: Constant.GET_NOTIFY,
    message,
  });
};

export default getNotification;
