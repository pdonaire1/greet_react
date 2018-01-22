import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
class TodoStore extends EventEmitter {
  constructor(){
    super();
    this.people = []
    this.countries = [
      {name: "Argentina", id: 1},
      {name: "Venezuela", id: 2},
      {name: "USA", id: 3},
    ]
  }

  getAll(){
    return this.people;
  }
  getCountries(){
    return this.countries;
  }
  createGreet(value){
    console.log("text: ", value)
    const id = Date.now();
    this.people.push(value);
    this.emit("change");
  }
  handleActions(action){
    console.log("TodoStore recieve an action", action);
    switch(action.type){
      case "CREATE_GREET":{
        this.createGreet(action.value);
      }
      case "GET_COUNTRIES": {
        this.getCountries()
      }

    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.todoStore = todoStore;
window.dispatcher = dispatcher;
// todoStore.on("change", )
export default todoStore;
