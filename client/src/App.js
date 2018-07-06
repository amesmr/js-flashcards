import React, { Component } from 'react';
import './App.css';
// import FlashCardContainer from './containers/FlashCardContainer';
import LandingPageContainer from './containers/LandingPageContainer/LandingPageContainer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
     
        <LandingPageContainer />
       
      </div>
    );
  }
}

export default App;
