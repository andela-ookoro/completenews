import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class HealineStore extends EventEmitter {
  constructor() {
    super();
    this.getSources = this.getSources.bind(this);
    this.sources = [];
    this.headlines = [];
    this.categories = {};
  }

 // return sources
  getSources() {

  }
 
  handleActions(action) {
  //  console.log("TodoStore received an action ...", action);
    switch (action.type) {
      case 'CREATE_TODO' :
        this.createTodo(action.text);
        break;
      case 'RECIEVE_TODO' :
        this.todos = action.todos;
        this.emit('change');
        // console.log(this.todos);
        break;
      default :
        return ('error');
    }
  }
}
const healineStore = new HealineStore();
Dispatcher.register(healineStore.handleActions.bind(healineStore));
// to use the onbject on browser console
window.healineStore = healineStore;
window.dispatcher = Dispatcher;
export default healineStore;
