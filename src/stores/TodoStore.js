import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
import axios from 'axios';

class TodoStore extends EventEmitter {
  constructor(){
    super();
    this.people = []
    this.currentPerson = []
    this.countries = [
      {name: "Argentina", id: 1},
      {name: "Venezuela", id: 2},
      {name: "USA", id: 3},
    ]
  }

  getAll(){
    return this.people;
  }
  getCurrentPerson(){
    return this.currentPerson;
  }
  getCountries(){
    // return this.countries;
    return axios.get('https://restcountries.eu/rest/v2/all')
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
      });
  }
  createGreet(value){
    const id = Date.now();
    this.people.push(value);
    this.emit("change");
  }
  currentGreet(value){
    this.currentPerson = value;
    this.emit("change");
  }
  handleActions(action){
    // console.log("TodoStore recieve an action", action);
    switch(action.type){
      case "CREATE_GREET":{
        this.createGreet(action.value);
      }
      case "GET_COUNTRIES": {
        this.getCountries()
      }
      case "CURRENT_GREET": {
        this.currentGreet(action.value);
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
