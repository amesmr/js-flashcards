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
          tagsSelected: null,
          cpSelected: null,
          arrayOfQuestions: [],
          apiLoaded: false
          
        }
    
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
        this.startButtonFlip = this.startButtonFlip.bind(this)
        this.grabStudySessionTags = this.grabStudySessionTags.bind(this)
        this.grabStudySessionCheckPoints = this.grabStudySessionCheckPoints.bind(this)
        this.ApiCalls = this.ApiCalls.bind(this)
      }
     
    
      hoverSwitchChange(dataFromMenu) {
        console.log(dataFromMenu)
        this.setState({
          hoverSwitch: dataFromMenu
        })
      }
      
      ApiCalls () {
        if(this.state.tagsSelected !== null && this.state.cpSelected !== null ) {
          API.getQuestionsByCpNumAndSubject(this.state.cpSelected, this.state.tagsSelected)
            .then(res => {
              console.log(res.data)
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
              console.log(this.state.apiLoaded)
            }).catch(err => {
              console.log(err)
            })
        } else if (this.state.cpSelected !== null) {
          API.getQuestionsByCpNumber(this.state.cpSelected)
            .then(res => {
              
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        } else if (this.state.tagsSelected !== null) {
          API.getQuestionsBySubject(this.state.tagsSelected)
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

      startButtonFlip() {
        
        this.ApiCalls()
        console.log("This has fired")
        this.setState({
          started: !this.state.started
        })
      }

      grabStudySessionTags(sessionFilters) {
        console.log("These are tags", sessionFilters)
        this.setState({
          tagsSelected: sessionFilters
        })
      }
    
      grabStudySessionCheckPoints(sessionCheckpoints) {
        console.log("These are the selected checkpoints", sessionCheckpoints)
        this.setState({
          cpSelected: sessionCheckpoints
        })
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
            />
            <div className="container">
            {this.state.apiLoaded &&
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