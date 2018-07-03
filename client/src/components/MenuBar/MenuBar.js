import React , { Component } from 'react';
import './MenuBar.css'


const checkpoints = ["CP1","CP2","CP3","CP4","CP5","CP6"];

class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tagdropdown: false,
            tags: ["Tag1","Tag2","Tag3","Tag4","Tag5"],
            cpdropdown: false,
            
        }

        this.openDropdown = this.openDropdown.bind(this)
        this.onCardTypeSelected = this.onCardTypeSelected.bind(this)
    }


    componentDidUpdate() {
        if(!this.props.initialRound) {
            console.log("You have stopped the flashcards")
        } else {
            const cpValues = []
            for (var i = 0; i<checkpoints.length;i++){
                console.log(this.refs.droptags + i)
            }
            
        
            this.props.sessionFilters("This is happening")
        }
    }

    openDropdown(filter) {

        if(filter === "tag") {
            if(this.state.tagdropdown) {
                this.refs.dropdownmenu.classList.remove('active')
                this.setState({
                    tagdropdown: false
                })
            } else {
                this.refs.dropdownmenu.classList.add('active')
                this.setState({
                    tagdropdown: true
                })
            }
        }

        if(filter === "checkpoint") {
            if(this.state.cpdropdown) {
                this.refs.dropdownmenuc.classList.remove('active')
                this.setState({
                    cpdropdown: false
                })
            } else {
                this.refs.dropdownmenuc.classList.add('active')
                this.setState({
                    cpdropdown: true
                })
            }
        }
        
            
    }

    onCardTypeSelected(event) {
        this.props.hoverGrab(event.currentTarget.value)
    }



    render() {
        return (
            <div className="menubar">
                <button className="menuitem menubtn" onClick={this.props.startFunc}>{this.props.initialRound ? "Stop" : "Start"}</button>
                <button className="menuitem menubtn">Shuffle</button>
                <div className="menuitem">
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" value="on" onChange={this.onCardTypeSelected} />
                            <span className="checkboxStyle">FlashCards</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" value="off"  onChange={this.onCardTypeSelected}/>
                            <span className="checkboxStyle">QuizCards</span>
                        </label>
                    </p>
                </div>
                <div className="menuitem">
                    <button className="dropbtn menubtn" onClick={() => this.openDropdown("tag")}>Sort by Tag</button>
                    <form className="dropdown-items" ref="dropdownmenu">
                        {this.state.tags.map((tag,iterator) => {
                            return (
                                <p key={iterator}>
                                    <label>
                                        <input type="checkbox" ref={`droptags${iterator}`} value={tag}/>
                                        <span>{tag}</span>
                                    </label>
                                </p>
                            )
                        })}
                        
                        
                    </form>
                </div>
                <div className="menuitem">
                    <button className="dropbtn menubtn" onClick={() => this.openDropdown("checkpoint")}>Sort by Checkpoint</button>
                    <form className="dropdown-items" ref="dropdownmenuc">
                        {checkpoints.map((cp,iterator) => {
                            return (
                                <p key={iterator + 100}>
                                    <label>
                                        <input type="checkbox" ref="dropcp" value={cp}/>
                                        <span>{cp}</span>
                                    </label>
                                </p>
                            )
                        })}  
                    
                    </form>
                </div>
            </div>
        )
    }
}

export default MenuBar;