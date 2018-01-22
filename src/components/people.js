/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';
import TodoStore from "../stores/TodoStore";
import * as TodoActions from "../actions/GreetActions";

class People extends Component {
  constructor(props){
    super(props);
      this.state = {
        people: TodoStore.getAll(),
      };
      this.getTodos = this.getTodos.bind(this);
  }
  componentWillMount(){
    console.log("ccc", this.state.countries)
    TodoStore.on("change", this.getTodos);
  }
  getTodos(){
    this.setState({
      todos: TodoStore.getAll(),
    });
  }
  componentWillUnmount(){
    TodoStore.removeListener("change", this.getTodos)
  }

  render() {
    const { people } = this.state;
    const TodoComponents = people.map((person) => {
      return <p key={person.id} className="people-option">
        {person.name} - {person.country} - {person.birthYear}</p>
    })
    return (
      <div className="people-box">
        <div style={{background: "#fff", borderRadius: "6px", height: "254px"}}>
          Visitantes Anteriores
          <p className="people-option">Mariano - Argentina - 01/01/1984</p>
          <p>Mariano - Argentina - 01/01/1984</p>
          <p>Mariano - Argentina - 01/01/1984</p>
          <hr />
          {TodoComponents}
        </div>
      </div>
    );
  }
}

export default People;
