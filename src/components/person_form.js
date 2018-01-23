/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap'
import TodoStore from "../stores/TodoStore";
import * as GreetActions from "../actions/GreetActions";
import Greet from "./greet";

class PersonForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      countries: TodoStore.getCountries(),
      name: '',
      country: '',
      birthDate: '',
      day: '',
      month: '',
      person_id: 0,
      future_year: '',
      showGreet: false,
      currentPerson: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.renderCountrySelect = this.renderCountrySelect.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.getCurrentPerson = this.getCurrentPerson.bind(this);
  }

  handleNameChange(event){
    this.setState({name: event.target.value, showGreet: false});
  }
  handleCountryChange(event){
    this.setState({country: event.target.value, showGreet: false});
  }
  handleBirthDateChange(event){
    this.setState({birthDate: event.target.value, showGreet: false});
  }
  resetForm(){
    this.setState({
      name: '',
      country: '',
      birthDate: ''
    });
  }
  componentWillMount(){
    TodoStore.on("change", this.getCurrentPerson);
  }
  getCurrentPerson(){
    this.setState({
      currentPerson: TodoStore.getCurrentPerson(),
      showGreet: true
    });
  }
  componentWillUnmount(){
    TodoStore.removeListener("change", this.getCurrentPerson)
  }
  createGreet(){
    var userData = {
      id: this.state.person_id,
      name: this.state.name,
      country: this.state.country,
      birthDate: this.state.birthDate
    }
    this.setState({
      showGreet: true,
      currentPerson: userData,
      person_id: this.state.person_id + 1
    });
    GreetActions.createGreet(userData);
    this.resetForm();
  }
  renderCountrySelect(){

    return (
      <FormGroup controlId="countryId">
        <ControlLabel>Pais</ControlLabel>
        <FormControl onChange={this.handleCountryChange}
          componentClass="select">
          {
            this.state.countries.map((country)=>{
              return (<option key={ country.id } value={country.name}>
                {country.name}
              </option>)
            })
          }
        </FormControl>
      </FormGroup>
    )
  }
  render(){
    return (
      <div>
        <FormGroup controlId="nameId">
          <ControlLabel>Nombre:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Nombre"
            onChange={this.handleNameChange}
            />
        </FormGroup>
        {this.renderCountrySelect()}

        <FormGroup controlId="birthDateId">
          <ControlLabel>Año de nacimiento:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.birthDate}
            placeholder="Año de nacimiento"
            onChange={this.handleBirthDateChange}
            />
        </FormGroup>

        <Button bsStyle="primary" onClick={this.createGreet.bind(this)}>Saludar</Button>
        <br />
        <Greet showGreet={this.state.showGreet} currentPerson={this.state.currentPerson}></Greet>
        <br />
      </div>
    )
  }
}

export default PersonForm;
