/*
Created by: @pdonaire1
Ing. Pablo Alejandro González Donaire
*/
import React, { Component } from 'react';

class Greet extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    console.log('ppppppppppp', this.props.currentPerson)
    return (
      <div>
        {
          this.props.showGreet
          &&
          <p>
            Hola {this.props.currentPerson.name} de {this.props.currentPerson.country}.
            El día {this.props.currentPerson.day} del mes {this.props.currentPerson.month}
            tendrás {this.props.currentPerson.future_year}
          </p>
        }
      </div>
    )
  }
}

export default Greet;
