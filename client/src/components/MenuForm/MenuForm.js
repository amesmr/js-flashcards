import React, { Component } from 'react'
import './MenuForm.css'

export default class MenuBar extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    render() {
        return (
        <div>
            <form>
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

                </div>
                <div className="form-section">
                </div>
                <button>Start</button>
            </form>
        </div>
        )
    }
}
