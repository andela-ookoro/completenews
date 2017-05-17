import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as Constant from '../constants';

class Favourite extends EventEmitter {
  constructor() {
    super();
    this.updateCount = this.updateCount.bind(this);
    this.count = 0;
  }

  updateCount() {
    return this.count;
  }

  handleActions(action) {
    switch (action.Type) {
      case Constant.GETFAVOURITE_COUNT:
        this.count = action.favouriteCount;
        this.emit('change');
        break;
      default:
    }
  }
}

const favouriteStore = new Favourite();
Dispatcher.register(favouriteStore.handleActions.bind(favouriteStore));
export default favouriteStore;

