
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * dispatches the user's current state
 * @param {boolean} status - The user's current authentication value
 * @param {object} userinfo - An object that content the user name, email and
 * profile image link and favourite articles count
 * @return {null } Return nothing.
*/
const authAction = (status, userinfo) => {
  if (typeof status === 'boolean') {
    Dispatcher.dispatch({
      Type: Constant.GET_AUTH_STATUS,
      status,
      userinfo,
    });
  } else {
    Dispatcher.dispatch({
      Type: Constant.GET_NOTIFY,
      message: 'Invalid datatype',
    });
  }
};

export default authAction;
