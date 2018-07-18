import React, { Component } from "react";
import "./App.css";
// import FlashCardContainer from './containers/FlashCardContainer';
import LandingPageContainer from "./containers/LandingPageContainer/LandingPageContainer";
import FlashCardContainer from "./containers/FlashCardContainer";
import QuizContainer from "./containers/QuizContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      // Holds the selected tags from the dropdown on change
      selectedTags: [],
      // Holds the select checkpoints from the dropdown on change
      selectedCP: [],
      // Hold the value of the current state of the study form the user selects
      formType: "FlashCards"
    };

    this.readyOrNot = this.readyOrNot.bind(this);
    this.checkedCP = this.checkedCP.bind(this);
    this.handleCPSelection = this.handleCPSelection.bind(this);
    this.checkedTags = this.checkedTags.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.handleFormSelection = this.handleFormSelection.bind(this);
  }

  readyOrNot() {
    this.setState({
      ready: !this.state.ready
    });
  }

  handleTagSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedTags.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedTags.filter(
        selection => selection !== newSelection
      );
    } else {
      // Need to add an if statement that only allows the user to select three to five tags maximum
      newSelectionArray = [...this.state.selectedTags, newSelection];
    }
    this.setState({ selectedTags: newSelectionArray }, () =>
      console.log("tag selection", this.state.selectedTags)
    );
  }

  handleCPSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedCP.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedCP.filter(
        selection => selection !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedCP, newSelection];
    }
    this.setState({ selectedCP: newSelectionArray }, () =>
      console.log("CP selection", this.state.selectedCP)
    );
  }

  // Returns a boolean value to allow dropdown to display which checkpoints are checked
  checkedCP(iterator) {
    return this.state.selectedCP.indexOf((iterator + 1).toString()) > -1;
  }

  // Returns a boolean value to allow dropdown to display which tags are checked
  checkedTags(tag) {
    return this.state.selectedTags.indexOf(tag) > -1;
  }

  handleFormSelection(e) {
    this.setState({
      formType: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.ready ? (
          <LandingPageContainer
            onstart={this.readyOrNot}
            checkedCP={this.checkedCP}
            handleCPSelection={this.handleCPSelection}
            checkedTags={this.checkedTags}
            handleTagSelection={this.handleTagSelection}
            handleFormSelection={this.handleFormSelection}
          />
        ) : this.state.formType === "FlashCards" ? (
          <FlashCardContainer
            selectedCP={this.state.selectedCP}
            selectedTags={this.state.selectedTags}
            readySwitch={this.readyOrNot}
          />
        ) : (
          <QuizContainer
            selectedCP={this.state.selectedCP}
            selectedTags={this.state.selectedTags}
          />
        )}
      </div>
    );
  }
}

export default App;
