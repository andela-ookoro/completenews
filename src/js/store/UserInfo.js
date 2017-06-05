import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * @FileOverview A class that listen to action dispatched for Authentication
 * status
 * and emit a change.
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class UserInfo extends EventEmitter {
  /** Create UserInfo object. */
  constructor() {
    super();
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.isAuth = false;
    this.userinfo = {};
  }

  /**
   * Set the sources .
   * @param {boolean} status - The authentication status to be set
   * @param {boolean} userinfo - The user metadata status to be set
   * @return {boolean} The authentication status .
  */
  updateUserInfo(status, userinfo) {
    this.isAuth = status;
    this.userinfo = userinfo;
    return this.isAuth;
  }

  /**
   * Listen to action dispatched and react to action of type GET_AUTH_STATUS
   * @param {object} action - The an action that was dispatched
   * @return {null} It return no value
  */
  handleActions(action) {
    switch (action.Type) {
      case Constant.GET_AUTH_STATUS:
        this.updateUserInfo(action.status, action.userinfo);
        this.emit('change');
        break;
      default :
    }
  }
}

const NewUserInfo = new UserInfo();
Dispatcher.register(NewUserInfo.handleActions.bind(NewUserInfo));
export default NewUserInfo;

