import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const getNotification = (message) => {
  Dispatcher.dispatch({
    Type: Constant.GET_NOTIFY,
    message,
  });
};

export default getNotification;
