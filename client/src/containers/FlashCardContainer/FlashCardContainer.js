import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import MenuBar from '../../components/MenuBar';
import './FlashCardContainer.css';

class FlashCardContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          hoverSwitch: "on",
          started: false
          
        }
    
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
        this.startButtonFlip = this.startButtonFlip.bind(this)
      }
     
    
      hoverSwitchChange(dataFromMenu) {
        console.log(dataFromMenu)
        this.setState({
          hoverSwitch: dataFromMenu
        })
      }

      startButtonFlip() {
        if(this.state.started) {
          // Perform an API call with the bounds taking from menu bar
        } else {
          // Do nothing. Or Potentially create a message on the Flashcards that says something along
          // the lines of YOU ARE CHANGING FLASHCARD SETTINGS
        }
        this.setState({
          started: !this.state.started
        })
      }
    
      render() {
        return (
        <div className="fcContainer">
            <MenuBar 
              hoverGrab={this.hoverSwitchChange}
              startFunc={this.startButtonFlip}
              initialRound={this.state.started}
            />
            <div className="container">
            
              <FlashCard
              question="This is a crazy question, holy shit"
              answers ={["Answer A", "Answer B","Answer C","Answer D"]}
              numberInSet={1}
              answer="Answer B"
              lesson="This is the lesson"
              goal="This is the goal"
              cpName="Checkpoint 5000"
              hoverSwitch={this.state.hoverSwitch}
              initialRound={this.state.started}
              /> 
              
            </div>
        </div>
        )
    }
}

export default FlashCardContainer;