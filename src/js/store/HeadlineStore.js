import {EventEmitter} from "events";
import dispatcher from '../Dispatcher';
import axios from "axios";
class HealineStore extends  EventEmitter {
	constructor() {
		super();
		this.getSources = this.getSources.bind(this);
		this.sources;
		this.todos =[
            {
               "id":1,
               "text":"Pray to God ",
               "complete":false
            },
				
            {
               "id":2,
               "text":"Check on family",
               "complete":false
            },
				
            {
               "id":3,
               "text":"Check your trello board and email",
               "complete":false
            },
			{
               "id":4,
               "text":"Check my today's activity",
               "complete":false
            }
         ];
	}

	// return sources
	getSources() {
		/**
		let _sources =[{name: "test"}];
		//fetch headline from api

		axios.get("https://newsapi.org/v1/sources?language=en")
			.then((reponse) => {
				_sources = reponse.data.sources;
				let list = reponse.data.sources;
				for (let value of list) {
				  //console.log(value);
				}
				this.sources = _sources
				console.log(this.sources); 
				//return this.sources;
			})
		  .catch(function (error) {
		    console.log(error);
		  });
		//return _sources;
		**/
		/** using return 
		return $.getJSON('https://newsapi.org/v1/sources?language=en')
      .then((reponse) => {
        this.setState({ sources: reponse.sources });
      });
     **/
	}


	//method to return all todo
	getAll() {
		return this.todos;
	}
	// method to add new todo 
	createTodo(text) {
		const id = Date.now();
		const newtodo ={
			id,
			text,
			"complete":false
		};
		this.todos.push(newtodo);
		this.emit("change");
		console.log(this.todos);
	}
	
	handleActions(action) {
		//console.log("TodoStore received an action ...", action);
		switch(action.type) {
			case "CREATE_TODO" : {
				this.createTodo(action.text);
			}
			case "RECIEVE_TODO" : {
				this.todos= action.todos;
				this.emit("change");
				console.log(this.todos);
			}
		}
	}
}
const healineStore = new HealineStore;
dispatcher.register(healineStore.handleActions.bind(healineStore));
// to use the onbject on browser console
window.healineStore = healineStore;
window.dispatcher = dispatcher;
export default healineStore;