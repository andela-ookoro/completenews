import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * @FileOverview A class that listen to action dispatched for notification
 * and emit a change.
 * @Author okwudiri.okoro@gandela.com (Okoro Celestine)
 */
class Notification extends EventEmitter {
   /** Create notification store. */
  constructor() {
    super();
    this.setMessage = this.setMessage.bind(this);
    this.message = '';
  }

  /**
   * Set the sources .
   * @param {string} message - The new message to be set
   * @return {string} The value of message of the object.
  */
  setMessage(message) {
    this.message = message;
    return this.message;
  }

  /**
   * Listen to action dispatched and react to action of type GET_NOTIFY
   * @param {object} action - The an action that was dispatched
   * @return {null} It return no value
  */
  handleActions(action) {
    switch (action.Type) {
      case Constant.GET_NOTIFY :
        this.setMessage(action.message);
        this.emit('change');
        break;
      default :
    }
  }
}

const notificationStore = new Notification();
Dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;

