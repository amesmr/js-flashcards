import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import MenuBar from '../../components/MenuBar';
import './FlashCardContainer.css';

class FlashCardContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          hoverSwitch: "on"
        }
    
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
      }
     
    
      hoverSwitchChange(dataFromMenu) {
        this.setState({
          hoverSwitch: dataFromMenu
        })
      }
    
      render() {
        return (
        <div className="fcContainer">
            <MenuBar 
              hoverGrab={this.hoverSwitchChange}
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
              />
            </div>
        </div>
        )
    }
}

export default FlashCardContainer;