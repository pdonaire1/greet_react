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
import PeopleStore from "../stores/PeopleStore";
import * as GreetActions from "../actions/GreetActions";
import Greet from "./greet";

class PersonForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      country: '',
      countries: [],
      birthDate: '',
      day: '',
      month: '',
      person_id: 0,
      future_year: '',
      showGreet: false,
      currentPerson: null,
      errors: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.renderCountrySelect = this.renderCountrySelect.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.getCurrentPerson = this.getCurrentPerson.bind(this);
    this.validDate = this.validDate.bind(this);
    this.validForm = this.validForm.bind(this);
  }

  handleNameChange(event){
    this.setState({name: event.target.value, showGreet: false});
    GreetActions.currentGreet();
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
    PeopleStore.getCountries().then((response)=>{
      this.setState({countries: response})
    });
    PeopleStore.on("change", this.getCurrentPerson);
  }
  getCurrentPerson(){
    this.setState({
      currentPerson: PeopleStore.getCurrentPerson(),
      showGreet: true
    });
  }
  componentWillUnmount(){
    PeopleStore.removeListener("change", this.getCurrentPerson)
  }
  validDate(text) {
    var date = Date.parse(text);
    if (isNaN(date)) {return false;}
    var comp = text.split('-');
    if (comp.length !== 3) {return false;}
    var d = parseInt(comp[2], 10);
    var m = parseInt(comp[1], 10);
    var y = parseInt(comp[0], 10);
    var date = new Date();
    if ((m > date.getMonth() + 1 && y >= date.getFullYear()) ||
      (d > date.getDate() && m >= date.getMonth() + 1 && y >= date.getFullYear())){
        return false;
    }
    return true;
  }
  validForm(){
    var errors = [];
    let name = this.state.name;
    if (name.replace(/\s+/, "") == ''){
      errors.push('Nombre inválido');
    }
    if (this.state.country.replace(/\s+/, "") == '' ){
      errors.push('Pais inválido');
    }
    if(!this.validDate(this.state.birthDate)){
      errors.push('Fecha inválida');
    }
    if (errors.length){
      this.setState({errors: errors})
      return false;
    }
    return true;
  }
  createGreet(){
    if (!this.validForm())
      return false;
    else this.setState({errors: []});
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
          <option key="0" value="">Seleccione Pais</option>
          {
            this.state.countries &&
            this.state.countries.map((country)=>{
              return (<option key={ country.alpha2Code } value={country.name}>
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
            type="date"
            value={this.state.birthDate}
            placeholder="Año de nacimiento"
            onChange={this.handleBirthDateChange}
            />
        </FormGroup>
        {
          this.state.errors.map((error, key) =>{
            return <p key={key} className="form-error">{error}</p>
          })
        }
        <Button bsStyle="primary" onClick={this.createGreet.bind(this)}>Saludar</Button>
        <br />
        <Greet showGreet={this.state.showGreet} currentPerson={this.state.currentPerson}></Greet>
        <br />
      </div>
    )
  }
}

export default PersonForm;
