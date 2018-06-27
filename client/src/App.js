import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlashCard from './components/FlashCard'

class App extends Component {

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          />
      </div>
    );
  }
}

export default App;
