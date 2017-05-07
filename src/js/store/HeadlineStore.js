import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class Headlines extends EventEmitter {
  constructor() {
    super();
    this.getHeadlines = this.getHeadlines.bind(this);
    this.headlines = [];
  }

 // return Headlines
  getHeadlines(headlines) {
    this.headlines = headlines;
    // console.log(Headlines);
    return this.headlines;
  }

  handleActions(action) {
  // console.log("TodoStore received an action ...", action.actionType);
    switch (action.actionType) {
      case 'GET-HEADLINES' :
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
