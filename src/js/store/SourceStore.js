import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * @FileOverview A class that listen to action dispatched for sources
 * and emit a change.
 * @extend EventEmitter
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class Sources extends EventEmitter {
   /** Create sources object . */
  constructor() {
    super();
    this.setSources = this.setSources.bind(this);
    this.sources = [];
  }

 /**
   * Set the sources .
   * @param {array} sources - The sources to be set
   * @return {array} The sources value.
  */
  setSources(sources) {
    this.sources = sources;
    return this.sources;
  }

  /**
   * Listen to action dispatched and react to action of type GET_SOURCES
   * @param {object} action - The an action that was dispatched
   * @return {null} It return no value
  */
  handleActions(action) {
    switch (action.Type) {
      case Constant.GET_SOURCES :
        this.setSources(action.sources);
        this.emit('change');
        break;
      default :
    }
  }
}
const SourceStore = new Sources();
Dispatcher.register(SourceStore.handleActions.bind(SourceStore));
export default SourceStore;
