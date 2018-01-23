/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';
// import logo from './logo.svg';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import People from "./components/people"
import PersonForm from "./components/person_form"
import PeopleStore from "./stores/PeopleStore";

import './App.css';
import './assets/styles/base.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {currentPerson: ""};
    this.getCurrentPerson = this.getCurrentPerson.bind(this);
  }
  componentWillMount(){
    PeopleStore.on("change", this.getCurrentPerson);
  }
  getCurrentPerson(){
    this.setState({
      currentPerson: PeopleStore.getCurrentPerson(),
      showGreet: true
    });
  }
  render() {

    return (
      <div className="App">

        <br />
        <Grid style={{background: "#ddd", borderRadius: "6px"}}>
          <Row>
            <Col>
              <p className="App-intro">
              Ejercicio invite
              </p>
              <p>Nombre: {this.state.currentPerson.name}</p>
            </Col>
          </Row>
          <form>
            <Row>
              <Col xs={12} md={6}>
                <PersonForm />
              </Col>
              <Col xs={12} md={6}>
                <People ></People>
              </Col>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}

import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// export default App;
