/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {name: "CHANGE"};
  }

  render() {

    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Developed by @pdonaire1</h1>
        </header>*/}
        <br />
        <Grid style={{background: "#ddd", borderRadius: "6px"}}>
          <Row>
            <Col>
              <p className="App-intro">
              Ejercicio intive
              </p>
              <p>Nombre: {this.state.name}</p>
            </Col>
          </Row>
          <form>
            <Row>
              <Col xs={12} md={6}>
              </Col>
              <Col xs={12} md={6}>
              </Col>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}

export default App;
