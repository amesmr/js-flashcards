import React from 'react';
import './FlashCard.css';


const FlashCard = (props) => (
    <div className="flashCard-container">
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
                Back of card.
            </div>
        </div>
    </div>
)

export default FlashCard; 