import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class Auth extends EventEmitter {
  constructor() {
    super();
    this.auth = this.auth.bind(this);
    this.isAuth = false;
  }

  auth(status) {
    this.isAuth = status;
    return this.isAuth;
  }

  handleActions(action) {
    switch (action.Type) {
      case 'AUTH' :
        this.auth(action.status);
        this.emit('change');
        break;
      default :
    }
  }
}

const AuthStore = new Auth();
Dispatcher.register(AuthStore.handleActions.bind(AuthStore));
export default AuthStore;

