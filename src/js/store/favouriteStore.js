import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

/**
 * @FileOverview A class that listen to action dispatched for favourite aritcles
 * and emit a change.
 * @Author okwudiri.okoro@andela.com (Okoro Celestine)
 */
class FavouriteCount extends EventEmitter {
   /** Create FavouriteCount object. */
  constructor() {
    super();
    this.count = 0;
  }

  /**
   * Listen to action dispatched and react to action of type GET_FAVOURITE_COUNT
   * @param {object} action - The an action that was dispatched
   * @return {null} It return no value
  */
  handleActions(action) {
    switch (action.Type) {
      case Constant.GET_FAVOURITE_COUNT:
        if (action.favouriteCount === 1) {
          this.count += 1;
        } else {
          this.count = action.favouriteCount;
        }

        this.emit('change');
        break;
      default:
    }
  }
}

const favouriteStore = new FavouriteCount();
Dispatcher.register(favouriteStore.handleActions.bind(favouriteStore));
export default favouriteStore;

