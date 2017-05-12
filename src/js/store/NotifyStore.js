import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

class Notification extends EventEmitter {
  constructor() {
    super();
    this.updateMessage = this.updateMessage.bind(this);
    this.message = '';
  }

  updateMessage(message) {
    this.message = message;
    return this.message;
  }

  handleActions(action) {
    switch (action.Type) {
      case Constant.GetNotify :
        this.updateMessage(action.message);
        this.emit('change');
        break;
      default :
    }
  }
}

const notificationStore = new Notification();
Dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;

