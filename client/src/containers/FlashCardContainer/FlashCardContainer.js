import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import MenuBar from '../../components/MenuBar';
import './FlashCardContainer.css';
import API from '../../utils/API';
import Button from '../../components/Button';


class FlashCardContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          // The state the determines the style of card (either flash card or quiz card)
          hoverSwitch: "on",
          // The state that determines if the user has begun a round of flashcards
          started: false,
          // This will store our array of questions returned from the API call
          arrayOfQuestions: [],
          // This is a state that prevents the flashcards from loading before the API response is received
          apiLoaded: false,
          // Holds the selected tags from the dropdown on change
          selectedTags: [],
          // Holds the select checkpoints from the dropdown on change
          selectedCP: [],
          // State to store the current index number of the question the user is on. Feel free to change to what you selected Matt.
          testNum: 0
          
        }
    
        // Binding this to all of the functions passed throughout the components
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
        this.startButtonFlip = this.startButtonFlip.bind(this)
        this.ApiCalls = this.ApiCalls.bind(this)
        this.handleCPSelection = this.handleCPSelection.bind(this)
        this.handleTagSelection = this.handleTagSelection.bind(this)
        this.checkedCP = this.checkedCP.bind(this)
        this.checkedTags = this.checkedTags.bind(this)
        this.nextFunc = this.nextFunc.bind(this)
        this.prevFunc = this.prevFunc.bind(this)
        this.shuffle = this.shuffle.bind(this)
      }

      handleTagSelection(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
        if(this.state.selectedTags.indexOf(newSelection) > -1) {
          newSelectionArray = this.state.selectedTags.filter(selection => selection !== newSelection)
        } else {
          // Need to add an if statement that only allows the user to select three to five tags maximum
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
        const sort = this.state.selectedTags.map(word => word.toLowerCase())
        if(this.state.selectedTags.length > 0 && this.state.selectedCP.length > 0 ) {
          API.getQuestionsByCpNumAndSubject(this.state.selectedCP.join('+'), sort.join('+'))
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
          API.getQuestionsByCpNumber(this.state.selectedCP.join('+'))
            .then(res => {
              
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        } else if (this.state.selectedTags.length > 0) {
          API.getQuestionsBySubject(sort.join('+'))
            .then(res => {
              console.log(res)
              this.setState({
                arrayOfQuestions: res.data,
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
      // For both this nextFunc and prevFunc do not forget to go back and change the this.state.testNum to match the actual index state
      nextFunc() {
        
        if(this.state.testNum + 1 >= this.state.arrayOfQuestions.length) {
          this.setState({
            testNum: 0
          })
        } else {
          this.setState({
            testNum: this.state.testNum + 1
          })
        }
        console.log(this.state.testNum)
      }

      prevFunc() {
        
        if(this.state.testNum - 1 === 0) {
          this.setState({
            testNum: this.state.arrayOfQuestions.length - 1
          })
        } else {
          this.setState({
            testNum: this.state.testNum - 1
          })
        }

        console.log(this.state.testNum)
      }

      // Using the Fisher-Yates shuffling algorithm
      shuffle() {
        let newArray = this.state.arrayOfQuestions
        for (let i = newArray.length - 1; i > 0 ;i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i],newArray[j]]=[newArray[j],newArray[i]];
        }
        
        this.setState({
          arrayOfQuestions: newArray
        })
      }

      
      render() {
        return (
        <div className="fcContainer">
            <MenuBar 
              shuffle={this.shuffle}
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
              <div>
              {this.state.arrayOfQuestions.length > 0 ?
              <FlashCard
              question={this.state.arrayOfQuestions[this.state.testNum].question}
              answers ={["Answer A", "Answer B","Answer C","Answer D"]}
              numberInSet={1}
              answer="Answer B"
              lesson="This is the lesson"
              goal="This is the goal"
              cpName="Checkpoint 5000"
              hoverSwitch={this.state.hoverSwitch}
              initialRound={this.state.started}
              /> :
              <h2>"There were no results found for this query! Try broadening your study session."</h2>
              }
            <Button type="Prev" prevFunc={this.prevFunc}/>
            <Button type="Next" nextFunc={this.nextFunc}/>
            </div>
            }
            </div>
        </div>
        )
    }
}

export default FlashCardContainer;