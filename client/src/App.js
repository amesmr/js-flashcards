import React, { Component } from 'react';
import './App.css';
import FlashCardContainer from './containers/FlashCardContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to Trilogy Study Buddy</h1>
        <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Click to Start Studying!</a>

        <FlashCardContainer />
      </div>
    );
  }
}

export default App;
