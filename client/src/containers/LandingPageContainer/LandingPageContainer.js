import React, { Component } from 'react';
import './LandingPageContainer.css';
import MenuForm from "../../components/MenuForm"


class LandingPageContainer extends Component {
    
    render() {
        return (
            <div className="App">
                    <div className="container">
                        <div className="row">
                            <div className="col m12 landingPage z-depth-3">
                                <h1>Welcome to Trilogy Study Buddy</h1>
                                <a className="waves-effect waves-light btn-large studyBtn" onClick={this.props.onstart}>Click to Start Studying!</a>
                            </div>
                        </div>
                        <div className="row">
                            <MenuForm
                            checkedCP={this.props.checkedCP}
                            handleCPSelection={this.props.handleCPSelection}
                            />
                        </div>
                    </div>
                    
            </div>
        );
    }
}
export default LandingPageContainer;