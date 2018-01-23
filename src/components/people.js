/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';
import PeopleStore from "../stores/PeopleStore";
import * as GreetActions from "../actions/GreetActions";

class People extends Component {
  constructor(props){
    super(props);
      this.state = {
        people: PeopleStore.getAll(),
      };
      this.getTodos = this.getTodos.bind(this);
  }
  componentWillMount(){
    PeopleStore.on("change", this.getTodos);
  }
  getTodos(){
    this.setState({
      todos: PeopleStore.getAll(),
    });
  }
  componentWillUnmount(){
    PeopleStore.removeListener("change", this.getTodos)
  }
  renderGreet(person){
    GreetActions.currentGreet(person);
  }
  render() {
    const { people } = this.state;
    const TodoComponents = people.map((person) => {
      let boundPersonClick = this.renderGreet.bind(this, person);
      return <p key={person.id} data={person} className="people-option"
        onClick={boundPersonClick}>
        {person.name} - {person.country} - {person.birthDate}</p>
    })
    return (
      <div className="people-box">
        <div style={{background: "#fff", borderRadius: "6px", height: "254px"}}>
          Visitantes Anteriores
          <hr />
          {TodoComponents}
        </div>
      </div>
    );
  }
}

export default People;
