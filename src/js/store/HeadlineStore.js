import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class Headlines extends EventEmitter {
  constructor() {
    super();
    this.getHeadlines = this.getHeadlines.bind(this);
    this.displayError = this.displayError.bind(this);
    this.headlines = [];
    this.error = '';
  }

 // return Headlines
  getHeadlines(headlines) {
    this.headlines = headlines;
    this.error = '';
    // console.log(Headlines);
    return this.headlines;
  }

  displayError() {
    this.error = 'Insufficient Internet coverage, Please check your connection and try again. ';
    return this.error;
  }

  handleActions(action) {
  // console.log("TodoStore received an action ...", action.actionType);
    switch (action.actionType) {
      case 'GET-HEADLINES' :
        this.getHeadlines(action.headlines);
        this.emit('change');
        break;
      case 'GET-HEADLINES-ERROR' :
        this.displayError();
        this.emit('change');
        break;
      case 'GET-DBHEADLINES' :
        this.getHeadlines(action.headlines);
        this.emit('change');
        break;
      case 'RESET-HEADLINES' :
        this.getHeadlines(action.headlines);
        this.emit('change');
        break;
      default :
        return ('error');
    }
  }
}
const headlinesStore = new Headlines();
Dispatcher.register(headlinesStore.handleActions.bind(headlinesStore));
// to use the onbject on browser console
window.healineStore = headlinesStore;
window.dispatcher = Dispatcher;
window.healineStore = headlinesStore;
export default headlinesStore;
