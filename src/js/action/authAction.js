
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

const getAuthStatus = (status) => {
  Dispatcher.dispatch({
    Type: Constant.Auth,
    status,
  });
};

export default getAuthStatus;
