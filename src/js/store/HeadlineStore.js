import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

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
    return this.headlines;
  }

  displayError(error) {
    this.error = error;
    return this.error;
  }

  handleActions(action) {
  // console.log("TodoStore received an action ...", action.actionType);
    switch (action.Type) {
      case Constant.GetHeadlines:
        this.getHeadlines(action.headlines);
        this.emit('change');
        break;
      case Constant.GetHeadlinesError :
        this.displayError(action.err);
        this.emit('error');
        break;
      case Constant.GetDBHeadlines :
        this.getHeadlines(action.headlines);
        this.emit('dbchange');
        break;
      default :
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
