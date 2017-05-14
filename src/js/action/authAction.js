
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const getAuthStatus = (status, userinfo) => {
  if (typeof status === 'boolean') {
    Dispatcher.dispatch({
      Type: Constant.Auth,
      status,
      userinfo,
    });
  } else {
    Dispatcher.dispatch({
      Type: Constant.GetNotify,
      message: 'Invalid datatype',
    });
  }
};

export default getAuthStatus;
