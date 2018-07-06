import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import MenuBar from '../../components/MenuBar';
import './FlashCardContainer.css';
import API from '../../utils/API'


class FlashCardContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          hoverSwitch: "on",
          started: false,
          arrayOfQuestions: [],
          apiLoaded: false,
          selectedTags: [],
          selectedCP: []
          
        }
    
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
        this.startButtonFlip = this.startButtonFlip.bind(this)
        this.ApiCalls = this.ApiCalls.bind(this)
        this.handleCPSelection = this.handleCPSelection.bind(this)
        this.handleTagSelection = this.handleTagSelection.bind(this)
        this.checkedCP = this.checkedCP.bind(this)
        this.checkedTags = this.checkedTags.bind(this)
      }

      handleTagSelection(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
        if(this.state.selectedTags.indexOf(newSelection) > -1) {
          newSelectionArray = this.state.selectedTags.filter(selection => selection !== newSelection)
        } else {
          newSelectionArray = [...this.state.selectedTags, newSelection];
        }
        this.setState({ selectedTags: newSelectionArray }, () => console.log('tag selection', this.state.selectedTags));
        }
        
        handleCPSelection(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
        if(this.state.selectedCP.indexOf(newSelection) > -1) {
          newSelectionArray = this.state.selectedCP.filter(selection => selection !== newSelection)
        } else {
          newSelectionArray = [...this.state.selectedCP, newSelection];
        }
        this.setState({ selectedCP: newSelectionArray }, () => console.log('CP selection', this.state.selectedCP));
        }
     
      checkedCP (iterator) {
        return this.state.selectedCP.indexOf((iterator+1).toString()) > -1
      }

      checkedTags (tag) {
        return this.state.selectedTags.indexOf(tag) > -1
      }


      hoverSwitchChange(dataFromMenu) {
        console.log(dataFromMenu)
        this.setState({
          hoverSwitch: dataFromMenu
        })
      }
      
      ApiCalls () {
        console.log(this.state.selectedTags)
        console.log(this.state.selectedCP)
        if(this.state.selectedTags.length > 0 && this.state.selectedCP.length > 0 ) {
          API.getQuestionsByCpNumAndSubject(this.state.selectedCP.join('+').toLowerCase(), this.state.selectedTags.join('+').toLowerCase())
            .then(res => {
              console.log(res.data)
              this.setState({
                arrayOfQuestions: res.data,
                apiLoaded: true
              })
              console.log(this.state.apiLoaded)
            }).catch(err => {
              console.log(err)
            })
        } else if (this.state.selectedCP.length > 0) {
          API.getQuestionsByCpNumber(this.state.selectedCP.join('+').toLowerCase())
            .then(res => {
              
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        } else if (this.state.selectedTags.length > 0) {
          API.getQuestionsBySubject(this.state.selectedTags.join('+').toLowerCase())
            .then(res => {
              console.log(res)
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        } else {
          API.getCheckpoints()
            .then(res => {
              console.log(res)
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        }
      }

      startButtonFlip () {
        if(this.state.started === false) {
            this.ApiCalls()
            console.log("This has fired")
            this.setState({
              started: !this.state.started
            })
          } else {
            this.setState({
              started: !this.state.started,
              arrayOfQuestions: [],
              apiLoaded: false
            })
          }
      }

      
      render() {
        return (
        <div className="fcContainer">
            <MenuBar 
              hoverGrab={this.hoverSwitchChange}
              startFunc={this.startButtonFlip}
              initialRound={this.state.started}
              sessionFilters={this.grabStudySessionTags}
              sessionCP={this.grabStudySessionCheckPoints}
              handleCPSelection={this.handleCPSelection}
              handleTagSelection={this.handleTagSelection}
              checkedCP={this.checkedCP}
              checkedTags={this.checkedTags}
            />
            <div className="container">
            {(this.state.apiLoaded && this.state.started) &&
              <FlashCard
              question={this.state.arrayOfQuestions[0].question}
              answers ={["Answer A", "Answer B","Answer C","Answer D"]}
              numberInSet={1}
              answer="Answer B"
              lesson="This is the lesson"
              goal="This is the goal"
              cpName="Checkpoint 5000"
              hoverSwitch={this.state.hoverSwitch}
              initialRound={this.state.started}
              /> 
            }
            </div>
        </div>
        )
    }
}

export default FlashCardContainer;