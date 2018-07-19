import React, { Component } from "react";
import "./QuizQuestion.css";

// Testing array for questions

export default class QuizQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      correctAnswers: 0
    };

    this.onAnswerSelected = this.onAnswerSelected.bind(this);
  }

  onAnswerSelected(event) {
    this.setState({
      selected: event.currentTarget.value
    });

    // if (this.props.options.indexOf(event.currentTarget.value) === this.props.answer) {
    //     this.props.increment(event.currentTarget.value, event.currentTarget.name)
    // }

    this.props.trackAnswers(
      event.currentTarget.value,
      event.currentTarget.name
    );
  }
  transFormQuestion = question => {
    let newQuestion = question;
    // console.log("orig question");
    newQuestion = newQuestion.replace(/[<]+/g, "&lt;"); // React is interpreting the < and > as tags
    newQuestion = newQuestion.replace(/[>]+/g, "&gt;");
    // console.log(question);
    if (question.indexOf("```") >= 0) {
      newQuestion = newQuestion.replace("```JavaScript", "<pre>"); // this will only replace the first occurance
      newQuestion = newQuestion.replace("```", "</pre>");
      newQuestion = newQuestion.replace(/[`]+/g, ""); // strip out any danglers
      newQuestion = newQuestion.replace("\n", ""); // strip out first \n
      newQuestion = newQuestion.slice(0, newQuestion.lastIndexOf("\n")); // then remove the last one
    }
    newQuestion = newQuestion.replace(/(?:\t)/g, "    "); // grrrr
    // console.log("new question");
    console.log(newQuestion);
    return newQuestion;
  };

  render() {
    return (
      <div>
        <hr />
        <span> {this.props.questionNum}. </span>
        <div className="question"
          dangerouslySetInnerHTML={{
            __html: this.transFormQuestion(this.props.question)
          }}
        />
        <ul className="answerColumn">
          {this.props.options.map((item, iterator) => {
            return (
              <li key={item}>
                <label>
                  <input
                    className="with-gap"
                    name={this.props.questionNum - 1}
                    type="radio"
                    value={item}
                    checked={this.state.selected === item}
                    onChange={this.onAnswerSelected}
                  />
                  <span className="answerChoice">{item}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
