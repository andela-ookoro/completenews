import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

class Sources extends EventEmitter {
  constructor() {
    super();
    this.getSources = this.getSources.bind(this);
    this.sources = [];
  }

 // return sources
  getSources(sources) {
    this.sources = sources;
    return this.sources;
  }

  handleActions(action) {
    switch (action.Type) {
      case Constant.GetSources :
        this.getSources(action.sources);
        this.emit('change');
        break;
      default :
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
