import React, { Component } from 'react';
import './QuizQuestion.css'



// Testing array for questions
const array = ["wow", "wow", "wow", "wow"]
export default class QuizQuestion extends Component {
    constructor(props) {
        super(props)
        
        
        this.state = {
            selected: ''
        }

        this.onAnswerSelected = this.onAnswerSelected.bind(this)
    }

    onAnswerSelected(event) {
        this.setState({
            selected: event.currentTarget.value
        })
    }


    render() {
        return (
            <div>
                <p>"This is where the question goes"</p>
                <ul>
                    {array.map((item, iterator) => {
                        return (
                            <li className="answerColumn" key={item}>
                                <label>
                                    <input className="with-gap" name={`group${iterator}`} type="radio" value={item} checked={this.state.selected === item} onChange={this.onAnswerSelected}  />
                                    <span className="answerChoice">{answer}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } 
}
