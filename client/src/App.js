import React, { Component } from 'react';
import './App.css';
import FlashCard from './components/FlashCard'
import MenuBar from './components/MenuBar';

class App extends Component {

  

  render() {
    return (
      <div className="App">
        <MenuBar className="menunav"/>
        <div className="container">
          <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          hoverSwitch="off"
          />
        </div>
        
      </div>
    );
  }
}

export default App;
