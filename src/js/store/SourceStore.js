import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class Sources extends EventEmitter {
  constructor() {
    super();
    this.getSources = this.getSources.bind(this);
    this.sources = [];
  }

 // return sources
  getSources(sources) {
    this.sources = sources;
    // console.log(sources);
    return this.sources;
  }

  handleActions(action) {
  // console.log("TodoStore received an action ...", action.actionType);
    switch (action.actionType) {
      case 'GET-SOURCES' :
        this.getSources(action.sources);
        this.emit('change');
        break;
      default :
        return ('error');
    }
  }
}
const sourceStore = new Sources();
Dispatcher.register(sourceStore.handleActions.bind(sourceStore));
// to use the onbject on browser console
window.healineStore = sourceStore;
window.dispatcher = Dispatcher;
window.healineStore = sourceStore;
export default sourceStore;
