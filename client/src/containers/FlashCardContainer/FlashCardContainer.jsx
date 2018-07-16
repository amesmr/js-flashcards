import React, { Component } from 'react';
import FlashCard from '../../components/FlashCard';
import MenuBar from '../../components/MenuBar';
import './FlashCardContainer.css';
import API from '../../utils/API';



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
          selectedTags: this.props.selectedTags,
          // Holds the select checkpoints from the dropdown on change
          selectedCP: this.props.selectedCP,
          // State to store the current index number of the question the user is on. Feel free to change to what you selected Matt.
          questionNum: 0,
          // State that will be passed to flash card to flip to front on next/previous
          flipToFront: false

        }

        // Binding this to all of the functions passed throughout the components
        this.hoverSwitchChange = this.hoverSwitchChange.bind(this)
        this.startButtonFlip = this.startButtonFlip.bind(this)
        this.ApiCalls = this.ApiCalls.bind(this)
        this.nextFunc = this.nextFunc.bind(this)
        this.prevFunc = this.prevFunc.bind(this)
        this.shuffle = this.shuffle.bind(this)
        
      }

      componentDidMount(){
        this.ApiCalls()
        this.setState({
          started: true
        })
      }
      // Grabs the value of the flash/quiz card switch in the menubar child component
      hoverSwitchChange(dataFromMenu) {
        console.log(dataFromMenu)
        this.setState({
          hoverSwitch: dataFromMenu
        })
      }
      // Utilizes API functions to retrieve desired content from our database
      ApiCalls () {
        // Takes the array of selected tags and reverts them to lowercase to match values in the database
        // const sort = this.state.selectedTags.map(word => word.toLowerCase())
        // Checks if user has selected any tags and any checkpoints (Utilizes the tags and cp API route)
        if(this.state.selectedTags.length > 0 && this.state.selectedCP.length > 0 ) {
          API.getQuestionsByCpNumAndSubject(this.state.selectedCP.join('+'), this.state.selectedTags.join('+')) // Joins selections by plus sign for compatability with routes
            .then(res => {
              console.log(res.data)
              this.setState({
                // Passes array of results into the state
                arrayOfQuestions: res.data,
                // Uses state to prevent flashcard from loading before response from API received
                apiLoaded: true
              })
              // console.log(this.state.apiLoaded)
            }).catch(err => {
              console.log(err)
            })
            // Else if that is activated if user only selects Checkpoints for sorting
        } else if (this.state.selectedCP.length > 0) {
          API.getQuestionsByCpNumber(this.state.selectedCP.join('+'))
            .then(res => {

              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                cpName: res.data[0].quiz.title,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
            // Else if that is activated if user only selects Tags for sorting
        } else if (this.state.selectedTags.length > 0) {
          API.getQuestionsBySubject(this.state.selectedTags.join('+'))
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
          // Grabs all of the available questions from the database, currently only is called if the user presses start with no selections made
          API.getCheckpoints()
            .then(res => {
              console.log(res)
              this.setState({
                arrayOfQuestions: res.data[0].quiz.questions,
                cpName: res.data[0].quiz.title,
                apiLoaded: true
              })
            }).catch(err => {
              console.log(err)
            })
        }
      }
      // The function included in the on click of the start button
      startButtonFlip () {
        // Fires if the button says Start (this.state.started starts as false on load)
        if(this.state.started === false) {
            // Fires the API call based on the criteria in the ApiCalls function
            this.ApiCalls()
            // console.log("This has fired")
            // Using setState as a switch/toggle
            this.setState({
              started: !this.state.started
            })
            // Activated when the button says Stop (this.state.start is equal to true)
          } else {
            this.setState({
              // Acts as a switch/toggle
              started: !this.state.started,
              // Clears the array of questions and prepares for new session
              arrayOfQuestions: [],
              // Returns the API loading failsafe in preparation for the next call
              apiLoaded: false

            })
            this.props.readySwitch()
          }
      }
      // For both this nextFunc and prevFunc do not forget to go back and change the this.state.questionNum to match the actual index state
      nextFunc() {
        // Resets the cards back to zero if user clicks next on the last card
        if(this.state.questionNum + 1 >= this.state.arrayOfQuestions.length) {
          this.setState({
            // Represents the index of the current visible question
            questionNum: 0,
            
          })
        } else {
          // Increments the index by one
          this.setState({
            questionNum: this.state.questionNum + 1,
            
          })
        }

        console.log(this.props)
        // console.log(this.state.questionNum)
      }

      prevFunc() {
        // Sets the question to the last selection in the array if the user hits previous on the first card
        if(this.state.questionNum === 0) {
          this.setState({
            questionNum: this.state.arrayOfQuestions.length - 1,
            
          })
        } else {
          // Decrements the index on each previous click
          this.setState({
            questionNum: this.state.questionNum - 1,
            
          })
        }

        // console.log(this.state.questionNum)
      }

      

      // Using the Fisher-Yates shuffling algorithm
      shuffle() {
        let newArray = this.state.arrayOfQuestions
        for (let i = newArray.length - 1; i > 0 ;i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i],newArray[j]]=[newArray[j],newArray[i]];
        }

        this.setState({
          arrayOfQuestions: newArray,
          questionNum: 0
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
            />
            <div className="container">

            {(this.state.apiLoaded && this.state.started) &&
              <div>
              {this.state.arrayOfQuestions.length > 0 ?
              <FlashCard
              number={(this.state.questionNum + 1).toString() + "/" + this.state.arrayOfQuestions.length.toString()}
              question={this.state.arrayOfQuestions[this.state.questionNum].question}
              answers ={this.state.arrayOfQuestions[this.state.questionNum].answers}
              answer={this.state.arrayOfQuestions[this.state.questionNum].answers[this.state.arrayOfQuestions[this.state.questionNum].answer]}
              objective={this.state.arrayOfQuestions[this.state.questionNum].objective}
              goal={this.state.arrayOfQuestions[this.state.questionNum].goal}
              description={this.state.arrayOfQuestions[this.state.questionNum].description}
              hoverSwitch={this.state.hoverSwitch}
              initialRound={this.state.started}
              prevFunc={this.prevFunc}
              nextFunc={this.nextFunc}
              /> :
              <h2>"There were no results found for this query! Try broadening your study session."</h2>
              }
            
            </div>
            }
            </div>
        </div>
        )
    }
}

export default FlashCardContainer;