import React, { Component } from 'react';
import './App.css';
import FlashCardContainer from './containers/FlashCardContainer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
    
    this.readyOrNot = this.readyOrNot.bind(this)
  }

  readyOrNot() {
    this.setState({
      ready: true
    })
  }

  render() {
    return (
      <div className="App">
      {!this.state.ready ?
        <div>
        <h1>Welcome to Trilogy Study Buddy</h1>
        <a class="waves-effect waves-light btn-large" onClick={this.readyOrNot}><i class="material-icons left">cloud</i>Click to Start Studying!</a>
        </div>
        :
        <FlashCardContainer />
      }
      </div>
    );
  }
}

export default App;
