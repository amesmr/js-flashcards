import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import './FlashCardContainer.css';

class FlashCardContainer extends Component {
    render() {
        return (
            <div className = "fcContainer">
                <FlashCard />
            </div>
        )
    }
}

export default FlashCardContainer;