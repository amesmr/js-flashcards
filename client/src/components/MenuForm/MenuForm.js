import React, { Component } from 'react'
import './MenuForm.css'


const checkpoints = ["Bash","HTML/CSS/Git","JavaScript","JavaScript/jQuery","Timers/API","Node","Express","MySQL","Mongo","ES6 and React","Computer Science","Java","Laravel/PHP","Python/Django"];
export default class MenuBar extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    render() {
        return (
        <div>
            <form className="form-component">
                <div className="form-section">
                    <p>
                        <label>
                            <input className="with-gap" name="content-type" type="radio" value=""/>
                            <span className="checkboxStyle">FlashCards</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input className="with-gap" name="content-type" type="radio" value=""/>
                            <span className="checkboxStyle">Take Quiz</span>
                        </label>
                    </p>
                </div>
                <div className="form-section">
                    <ul>
                        {checkpoints.map((cp,iterator) => {
                            return (
                                <li key={iterator + 100}>
                                    <label>
                                        <input 
                                        type="checkbox" 
                                        name={cp} 
                                        value={iterator+1}
                                        checked={this.props.checkedCP(iterator)} 
                                        onChange={this.props.handleCPSelection}
                                        />
                                        <span>{cp}</span>
                                    </label>
                                </li>
                            )
                        })} 
                    </ul> 
                </div>
                <div className="form-section">
                </div>
                <button>Start</button>
            </form>
        </div>
        )
    }
}
