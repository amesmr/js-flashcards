import React , { Component } from 'react';
import './MenuBar.css'



class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tagdropdown: false,
            tags: ["Tag1","Tag2","Tag3","Tag4","Tag5"],
            cpdropdown: false,
            checkpoints: ["CP1","CP2","CP3","CP4","CP5","CP6"],
        }

        this.openDropdown = this.openDropdown.bind(this)
        this.onCardTypeSelected = this.onCardTypeSelected.bind(this)
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
                <button className="menuitem">Shuffle</button>
                <button className="menuitem">Reset</button>
                <div className="menuitem">
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" value="on" onChange={this.onCardTypeSelected} />
                            <span>FlashCards</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" value="off"  onChange={this.onCardTypeSelected}/>
                            <span>QuizCards</span>
                        </label>
                    </p>
                </div>
                <div className="menuitem">
                    <button className="dropbtn" onClick={() => this.openDropdown("tag")}>Sort by Tag</button>
                    <form className="dropdown-items" ref="dropdownmenu">
                        {this.state.tags.map((tag,iterator) => {
                            return (
                                <p key={iterator}>
                                    <label>
                                        <input type="checkbox" value={tag}/>
                                        <span>{tag}</span>
                                    </label>
                                </p>
                            )
                        })}
                        
                    </form>
                </div>
                <div className="menuitem">
                    <button className="dropbtn" onClick={() => this.openDropdown("checkpoint")}>Sort by Checkpoint</button>
                    <form className="dropdown-items" ref="dropdownmenuc">
                        {this.state.checkpoints.map((cp,iterator) => {
                            return (
                                <p key={iterator + 100}>
                                    <label>
                                        <input type="checkbox" value={cp}/>
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