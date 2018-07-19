import React, { Component } from 'react';
import './QuizQuestion.css'



// Testing array for questions

export default class QuizQuestion extends Component {
    constructor(props) {
        super(props)


        this.state = {
            selected: '',
            correctAnswers: 0
        }

        this.onAnswerSelected = this.onAnswerSelected.bind(this)
    }

    onAnswerSelected(event, bool) {
        this.setState({
            selected: event.currentTarget.value
        })
        
        // if (this.props.options.indexOf(event.currentTarget.value) === this.props.answer) {
        //     this.props.increment(event.currentTarget.value, event.currentTarget.name)
        // }
        
        this.props.trackAnswers(event.currentTarget.value, event.currentTarget.name);

    }


    render() {
        return (
            <div>

                <p><span>{this.props.questionNum}</span>. {this.props.question}</p>
                <ul className="answerColumn">
                    {this.props.options.map((item, iterator) => {
                        return (
                            <li key={item}>
                                <label>
                                    <input className="with-gap" name={this.props.questionNum - 1} type="radio" value={item} checked={this.state.selected === item} onChange={this.onAnswerSelected}  />
                                    <span className="answerChoice">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
