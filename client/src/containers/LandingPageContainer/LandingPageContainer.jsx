import React, { Component } from "react";
import "./LandingPageContainer.css";
import MenuForm from "../../components/MenuForm";

class LandingPageContainer extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row jumbo-landing">
            <div className="col m12 landingPage z-depth-3">
              <p className="landingTitle">Welcome to Trilogy Study Buddy</p>
              <p className="landingInfo">
                Select your preferred options below and click to Start Studying!
              </p>
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
          <div className="row">
            <div className="col m4 offset-m4">
              <a
                className="waves-effect waves-light btn studyBtn"
                onClick={this.props.onstart}
              >
                Start Studying!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPageContainer;
