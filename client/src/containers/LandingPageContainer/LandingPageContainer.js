import React, { Component } from 'react';
import './LandingPageContainer.css';
import FlashCardContainer from '../FlashCardContainer'

class LandingPageContainer extends Component {
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
                    <div className="container">
                        <div class="row">
                            <div className="col m12 landingPage z-depth-3">
                                <h1>Welcome to Trilogy Study Buddy</h1>
                                <a className="waves-effect waves-light btn-large studyBtn" onClick={this.readyOrNot}>Click to Start Studying!</a>
                            </div>
                        </div>
                    </div>
                    :
                    <FlashCardContainer />
                }
            </div>
        );
    }
}
export default LandingPageContainer;