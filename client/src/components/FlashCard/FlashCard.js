import React, { Component } from 'react';
import './FlashCard.css';


class FlashCard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          flipped: false,
          selected: '',
          correct: false
        }
    
        this.checkAnswer = this.checkAnswer.bind(this)
        this.onAnswerSelected = this.onAnswerSelected.bind(this)
      }
      
      componentDidMount(){
          if (this.props.hoverSwitch === "off") {
              console.log("This is working")
            this.refs.flipCardContainer.removeAttribute("id","hoverSwitch")
          } 
      }
    
      checkAnswer(event) {
        event.preventDefault();

        console.log(this.state.selected)        
        if(!this.state.flipped) {
            this.refs.flipCardContainer.classList.add("hover")
          this.setState({
            flipped: true
          })
          console.log("Flip to back")
        } else {
            this.refs.flipCardContainer.classList.remove("hover")
          this.setState({
            flipped: false
          })
          console.log("Flip to front")
        }
      }

      onAnswerSelected(event) {
          this.setState({
              selected: event.currentTarget.value
          })
      }



    render() {
        return (
        <div ref="flipCardContainer" id="hoverSwitch" className="flashCard-container">
            <div className="flipper">
                <div className="front">
                    <h6>{this.props.question}</h6>
                    <form>
                    {this.props.answers.map((answer, iterator) => {
                        return (
                            this.props.hoverSwitch === "off" ?
                            <p key={iterator}>
                                <label>
                                    <input className="with-gap" name="group1" type="radio" value={answer} checked={this.state.selected === answer} onChange={this.onAnswerSelected}  />
                                    <span>{answer}</span>
                                </label>
                            </p> 
                            :
                            <p key={iterator}>
                                <label>
                                    <span>{answer}</span>
                                </label>
                            </p>
                        )
                    })}
                    
                {this.props.hoverSwitch === "off" && <input type="submit" onClick={this.checkAnswer} />}
                    
                    
                    </form>
                </div>
                <div className="back">
                    <p>{ this.props.hoverSwitch === "off" && (this.props.answer === this.state.selected ? "You were correct!" : "Sorry, that is incorrect!"
                    )}</p>
                    <h6>The answer was {this.props.answer}</h6>

                    <p><i>{this.props.lesson}</i></p>
                    <p><i>{this.props.goal}</i></p>

                    <p>{this.props.cpName}</p>
                    {this.props.hoverSwitch === "off" && <input type="reset" onClick={this.checkAnswer} />}
                    
                </div>
            </div>
        </div>)
    }
}

export default FlashCard; 