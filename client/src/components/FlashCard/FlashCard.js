import React from 'react';
import './FlashCard.css';


const FlashCard = (props) => (
    <div id="flipCardContainer" className="flashCard-container">
        <div className="flipper">
            <div className="front">
                <h6>{props.question}</h6>
                <form>
                {props.answers.map((answer, iterator) => {
                    return (
                        <p key={iterator}>
                            <label>
                                <input className="with-gap" name="group1" type="radio" value={answer}  />
                                <span>{answer}</span>
                            </label>
                        </p>
                    )
                })}
                
                <input type="submit" onClick={props.checkAnswer} /> 
                
                
                </form>
            </div>
            <div className="back">
                <p>You were correct!</p>
                <h6>The answer was {props.answer}</h6>

                <p><i>{props.lesson}</i></p>
                <p><i>{props.goal}</i></p>

                <p>{props.cpName}</p>
                <input type="reset" onClick={props.checkAnswer} />
            </div>
        </div>
    </div>
)

export default FlashCard; 