import React, { Component } from 'react';
import './App.css';
// import FlashCardContainer from './containers/FlashCardContainer';
import LandingPageContainer from './containers/LandingPageContainer/LandingPageContainer';
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
        <LandingPageContainer onstart={this.readyOrNot}/>
        :
        <FlashCardContainer />
      }
       
      </div>
    );
  }
}

export default App;
