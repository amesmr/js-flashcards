import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import './FlashCardContainer.css';

class FlashCardContainer extends Component {
    render() {
        return (
            <div className = "fcContainer">
            <h1>NAV BAR GOES HERE</h1>
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
            </div>
        )
    }
}

export default FlashCardContainer;