import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class Notification extends EventEmitter {
  constructor() {
    super();
    this.displayMessage = this.displayMessage.bind(this);
    this.message = '';
  }

  displayMessage(message) {
    this.message = message;
    return this.message;
  }

  handleActions(action) {
    switch (action.Type) {
      case 'GET-NOTIFY' :
        this.displayMessage(action.message);
        this.emit('change');
        break;
      default :
        return ('error');
    }
  }
}

const notificationStore = new Notification();
Dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;

