import React, { Component } from 'react';
import './FlashCard.css';


class FlashCard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          flipped: false
        }
    
        this.checkAnswer = this.checkAnswer.bind(this)
      }
      
      componentDidMount(){
          if (this.props.hoverSwitch === "off") {
            this.refs.flipCardContainer.removeAttribute("id","hoverSwitch")
          } 
      }
    
      checkAnswer(event) {
        event.preventDefault();
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



    render() {
        return (
        <div ref="flipCardContainer" className="flashCard-container">
            <div className="flipper">
                <div className="front">
                    <h6>{this.props.question}</h6>
                    <form>
                    {this.props.answers.map((answer, iterator) => {
                        return (
                            <p key={iterator}>
                                <label>
                                    <input className="with-gap" name="group1" type="radio" value={answer}  />
                                    <span>{answer}</span>
                                </label>
                            </p>
                        )
                    })}
                    
                    <input type="submit" onClick={this.checkAnswer} /> 
                    
                    
                    </form>
                </div>
                <div className="back">
                    <p>You were correct!</p>
                    <h6>The answer was {this.props.answer}</h6>

                    <p><i>{this.props.lesson}</i></p>
                    <p><i>{this.props.goal}</i></p>

                    <p>{this.props.cpName}</p>
                    <input type="reset" onClick={this.checkAnswer} />
                </div>
            </div>
        </div>)
    }
}

export default FlashCard; 