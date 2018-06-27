import React , { Component } from 'react';
import './MenuBar.css'

class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <nav className="row">
                <div className="col s1 flow-text">
                    <a class="waves-effect waves-light btn">
                        <i class="material-icons right">
                            cloud
                        </i>
                        Reset
                    </a>
                </div>
                <div className="col s1 flow-text">Shuffle</div>
                <div className="col s1 flow-text">FlashCards</div>
                <div className="col s1 flow-text">QuizCards</div>
                <div className="col s2 offset-s4 flow-text">Module Drodivdown</div>
                <div className="col s2 flow-text">Tag Drodivdown</div>
            </nav>
        )
    }
}

export default MenuBar;