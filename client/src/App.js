import React, { Component } from 'react';
import './App.css';
import FlashCardContainer from './containers/FlashCardContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to Trilogy Study Buddy</h1>
        <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>Click to Start Studying!</a>

<<<<<<< HEAD
        <FlashCardContainer />
=======
        <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>

        <FlashCard
          question="This is a crazy question, holy shit"
          answers ={["Answer A", "Answer B","Answer C","Answer D"]}
          numberInSet={1}
          answer="Answer B"
          lesson="This is the lesson"
          goal="This is the goal"
          cpName="Checkpoint 5000"
          hoverSwitch="on"
          />
>>>>>>> 59fb7650fbbfae17048efe1c464288f57aa41a1a
      </div>
    );
  }
}

export default App;
