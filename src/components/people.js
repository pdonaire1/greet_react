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
        todos: TodoStore.getAll(),
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
    const { todos } = this.state;
    const TodoComponents = todos.map((todo) => {
      return <p key={todo.id}>{todo.text}</p>
    })
    return (
      <div className="people-box">
        <div style={{background: "#fff", borderRadius: "6px", height: "254px"}}>
          Visitantes Anteriores
          <p>Mariano - Argentina - 01/01/1984</p>
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
