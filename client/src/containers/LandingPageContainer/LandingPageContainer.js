import React, { Component } from 'react';
import './LandingPageContainer.css';
import MenuForm from "../../components/MenuForm"


class LandingPageContainer extends Component {
    
    render() {
        return (
            <div>
                    <div className="container">
                        <div className="row jumbo-landing">
                            <div className="col m12 landingPage z-depth-3">
                                <h1>Welcome to Trilogy Study Buddy</h1>
                                <a className="waves-effect waves-light btn-large studyBtn" onClick={this.props.onstart}>Click to Start Studying!</a>
                            </div>
                        </div>
                        <div className="row">
                            <MenuForm
                            checkedCP={this.props.checkedCP}
                            handleCPSelection={this.props.handleCPSelection}
                            checkedTags={this.props.checkedTags}
                            handleTagSelection={this.props.handleTagSelection}
                            handleFormSelection={this.props.handleFormSelection}
                            />
                        </div>
                    </div>
                    
            </div>
        );
    }
}
export default LandingPageContainer;