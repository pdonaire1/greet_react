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

class PersonForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      countries: TodoStore.getCountries(),
      name: '',
      country: '',
      birthYear: '',
      day: '',
      month: '',
      person_id: 0,
      future_year: '',
      saved: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleBirthYearChange = this.handleBirthYearChange.bind(this);
    this.renderCountrySelect = this.renderCountrySelect.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleNameChange(event){
    this.setState({name: event.target.value, saved: false});
  }
  handleCountryChange(event){
    this.setState({country: event.target.value, saved: false});
  }
  handleBirthYearChange(event){
    this.setState({birthYear: event.target.value, saved: false});
  }
  resetForm(){
    this.setState({
      name: '',
      country: '',
      birthYear: ''
    });
  }
  createGreet(){
    this.setState({saved: true, person_id: this.state.person_id + 1});
    var userData = {
      id: this.state.person_id,
      name: this.state.name,
      country: this.state.country,
      birthYear: this.state.birthYear
    }
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

        <FormGroup controlId="birthYearId">
          <ControlLabel>Año de nacimiento:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.birthYear}
            placeholder="Año de nacimiento"
            onChange={this.handleBirthYearChange}
            />
        </FormGroup>

        <Button bsStyle="primary" onClick={this.createGreet.bind(this)}>Saludar</Button>
        <br />
        {
          this.state.saved
          &&
          <p>
          Hola {this.state.name} de {this.state.country}.
          El día {this.state.day} del mes {this.state.month}
          tendrás {this.state.future_year}
          </p>
        }
        <br />
      </div>
    )
  }
}

export default PersonForm;
