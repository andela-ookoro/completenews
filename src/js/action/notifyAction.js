import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const getNotification = (message) => {
  Dispatcher.dispatch({
    Type: Constant.GetNotify,
    message,
  });
};

export default getNotification;