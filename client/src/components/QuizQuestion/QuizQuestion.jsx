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

    onAnswerSelected(event) {
        this.setState({
            selected: event.currentTarget.value
        })

        // if (this.props.options.indexOf(event.currentTarget.value) === this.props.answer) {
        //     this.props.increment(event.currentTarget.value, event.currentTarget.name)
        // }

        this.props.trackAnswers(event.currentTarget.value, event.currentTarget.name);

    }
    transFormQuestion = question => {
      let newQuestion = question;
      // console.log("orig question");
      // console.log(question);
      if (question.indexOf("```") >= 0) {
          newQuestion = newQuestion.replace("```JavaScript", "<pre>"); // this will only replace the first occurance
          newQuestion = newQuestion.replace("```", "</pre>");
          newQuestion = newQuestion.replace('/[`]/g', ''); // strip out any danglers
      }
      newQuestion = newQuestion.replace(/(?:\r\n|\r|\n)/g, '<br>');  // the regex allows for global replacements
      newQuestion = newQuestion.replace(/(?:\t)/g, '    '); // grrrr
      // console.log("new question");
      // console.log(newQuestion);
      return newQuestion;
  }

    render() {
        return (
            <div>

                <p><span>{this.props.questionNum}</span>.</p> 
                            <div dangerouslySetInnerHTML={{ __html: this.transFormQuestion(this.props.question) }} >
                            </div>
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
