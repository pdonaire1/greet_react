import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
class TodoStore extends EventEmitter {
  constructor(){
    super();
    this.todos = [
      {
        id:1,
        text: "text one",
        complete: false
      },
      {
        id:2,
        text: "text two",
        complete: false
      },
    ]
    this.countries = [
      {name: "Argentina", id: 1},
      {name: "Venezuela", id: 2},
      {name: "USA", id: 3},
    ]
  }

  getAll(){
    return this.todos;
  }
  getCountries(){
    return this.countries;
  }
  createGreet(text){
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false,
    });
    this.emit("change");
  }
  handleActions(action){
    console.log("TodoStore recieve an action", action);
    switch(action.type){
      case "CREATE_GREET":{
        this.createGreet(action.text);
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
