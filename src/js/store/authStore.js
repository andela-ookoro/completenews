import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

class Auth extends EventEmitter {
  constructor() {
    super();
    this.updateAuth = this.updateAuth.bind(this);
    this.isAuth = false;
  }

  updateAuth(status) {
    this.isAuth = status;
    return this.isAuth;
  }

  handleActions(action) {
    switch (action.Type) {
      case Constant.Auth:
        this.updateAuth(action.status);
        this.emit('change');
        break;
      default :
    }
  }
}

const AuthStore = new Auth();
Dispatcher.register(AuthStore.handleActions.bind(AuthStore));
export default AuthStore;

