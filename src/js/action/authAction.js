
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const getAuthStatus = (status) => {
  if (typeof status === 'boolean') {
    Dispatcher.dispatch({
      Type: Constant.Auth,
      status,
    });
  } else {
    Dispatcher.dispatch({
      Type: Constant.GetNotify,
      message: 'Invalid datatype',
    });
  }
};

export default getAuthStatus;
