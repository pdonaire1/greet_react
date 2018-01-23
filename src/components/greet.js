/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';

class Greet extends Component{
  constructor(props){
    super(props);
    this.state = {
      calculatedDate: '',
      calculatedMonth:'',
      calculatedYear:'',
      resultAge: ''
    };

  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.currentPerson){
      var birthDate = nextProps.currentPerson.birthDate.split('-');
      var currentYear = (new Date()).getFullYear();
      let day = Math.floor((Math.random() * 28) + 1);
      let month = Math.floor((Math.random() * 12) + 1);
      let year = Math.floor(Math.random() * ((currentYear + 50) - currentYear + 1)) + currentYear;
      var age = year - birthDate[0];
      var months = month - birthDate[1];
      if (months == 0){ // If we are in the same month
        if (day - birthDate[2] < 0)
          age -= 1; // we have not turned years
      }else if (month < birthDate[1]) {
        age -= 1; // we have not reached the month to meet years
      }
      this.setState({
        calculatedDay: day,
        calculatedMonth: month,
        calculatedYear: year,
        resultAge: age,
      })

    }
  }
  render(){

    return (
      <div>
        {
          this.props.showGreet
          &&
          this.props.currentPerson
          &&
          <p>
            Hola {this.props.currentPerson.name} de {this.props.currentPerson.country}.
            El día {this.state.calculatedDay} del mes {this.state.calculatedMonth}&nbsp;
            del año {this.state.calculatedYear} tendrás {this.state.resultAge}
          </p>
        }
      </div>
    )
  }
}

export default Greet;
