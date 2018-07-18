import React, { Component } from "react";
import "./FlashCard.css";
import Button from "../Button";

// Need to fix bug for when you are using quiz cards and you submit your answer, if you try to switch back to flash cards when on the back the card freezes up
class FlashCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
      selected: "",
      correct: false
    };

    this.checkAnswer = this.checkAnswer.bind(this);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
  }

  // On component mount (following API response) checks for the status of the card type switch and presents the appropriate card type
  componentDidMount() {
    if (this.props.hoverSwitch === "off") {
      //console.log("This is working")
      this.refs.flipCardContainer.removeAttribute("id", "hoverSwitch");
    }
  }
  // Any time the card type is switch update the DOM to reflect the user selection. Allows for switch mid study session
  componentDidUpdate() {
    if (this.props.hoverSwitch === "off") {
      //console.log("This is working")
      this.refs.flipCardContainer.removeAttribute("id", "hoverSwitch");
    } else {
      this.refs.flipCardContainer.setAttribute("id", "hoverSwitch");
    }
  }

  // Checks the user selection against answer if the user has chosen to use the quiz cards
  checkAnswer(event) {
    event.preventDefault();

    //console.log(this.state.selected)
    if (!this.state.flipped) {
      this.refs.flipCardContainer.classList.add("hover");
      this.setState({
        flipped: true
      });

      //console.log("Flip to back")
    } else {
      this.refs.flipCardContainer.classList.remove("hover");
      this.setState({
        flipped: false
      });

      //console.log("Flip to front")
    }
  }

  // Stores the user's choice on quiz card in the state
  onAnswerSelected(event) {
    this.setState({
      selected: event.currentTarget.value
    });
  }

  transFormQuestion = question => {
    let newQuestion = question;
    // console.log("orig question");
    // console.log(question);
    if (question.indexOf("```") >= 0) {
      newQuestion = newQuestion.replace("```JavaScript", "<pre>"); // this will only replace the first occurance
      newQuestion = newQuestion.replace("```", "</pre>");
      newQuestion = newQuestion.replace("/[`]/g", ""); // strip out any danglers
      newQuestion = newQuestion.replace("\n", ""); // strip out first \n
      newQuestion = newQuestion.slice(0, newQuestion.lastIndexOf("\n")); // then remove the last one
    }
    // newQuestion = newQuestion.replace(/(?:\r\n|\r|\n)/g, "<br>"); // the regex allows for global replacements
    newQuestion = newQuestion.replace(/(?:\t)/g, "    "); // grrrr
    // console.log("new question");
    console.log(newQuestion);
    return newQuestion;
  };

  render() {
    return (
      <div
        ref="flipCardContainer"
        id="hoverSwitch"
        className="flashCard-container"
      >
        <div className="flipper" onClick={this.checkAnswer}>
          <div className="front">
            {/* <h6 className="question">{this.props.question}</h6> */}
            <span>{this.props.number}</span>
            <div  className="question"
              dangerouslySetInnerHTML={{
                __html: this.transFormQuestion(this.props.question)
              }}
            />
            <form>
              <ul className="answerColumn">
                {this.props.answers.map((answer, iterator) => {
                  return this.props.hoverSwitch === "off" ? (
                    <li key={iterator}>
                      <label>
                        <input
                          className="with-gap"
                          name="group1"
                          type="radio"
                          value={answer}
                          checked={this.state.selected === answer}
                          onChange={this.onAnswerSelected}
                        />
                        <span className="answerChoice">{answer}</span>
                      </label>
                    </li>
                  ) : (
                    <li key={iterator}>
                      <label>
                        <span>{answer}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {this.props.hoverSwitch === "off" ? (
                <input type="submit" onClick={this.checkAnswer} />
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="back">
            <span>{this.props.number}</span>
            <p>
              {this.props.hoverSwitch === "off" &&
                (this.props.answer === this.state.selected
                  ? "You were correct!"
                  : "Sorry, that is incorrect!")}
            </p>
            <h6>The answer was: </h6>
            <code className="answerReveal">{this.props.answer}</code>
            <p className="objective">
              <i>Objective: {this.props.objective}</i>
            </p>
            <p className="description">
              <i>Description: {this.props.description}</i>
            </p>
            <p className="cpName">{this.props.cpName}</p>
            {this.props.hoverSwitch === "off" ? (
              <input type="reset" onClick={this.checkAnswer} />
            ) : (
              ""
            )}
            <Button
              type="Prev"
              prevFunc={() => {
                this.props.prevFunc();
                this.refs.flipCardContainer.classList.remove("hover");
                this.setState({
                  flipped: false
                });
              }}
            />
            <Button
              type="Next"
              nextFunc={() => {
                this.props.nextFunc();
                this.refs.flipCardContainer.classList.remove("hover");
                this.setState({
                  flipped: false
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FlashCard;
