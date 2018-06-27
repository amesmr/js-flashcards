import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlashCard from './components/FlashCard'

class App extends Component {

  constructor() {
    super()

    this.state = {
      flipped: false
    }

    this.checkAnswer = this.checkAnswer.bind(this)
  }

  checkAnswer(event) {
    event.preventDefault();
    if(!this.state.flipped) {
      document.getElementById("flipCardContainer").classList.add("hover")
      this.setState({
        flipped: true
      })
      console.log("Flip to back")
    } else {
      document.getElementById("flipCardContainer").classList.remove("hover")
      this.setState({
        flipped: false
      })
      console.log("Flip to front")
    }
  }

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
          checkAnswer={this.checkAnswer}
          cardSide={this.state.flipped}
          />
      </div>
    );
  }
}

export default App;
