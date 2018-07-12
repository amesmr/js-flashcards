import React , { Component } from 'react';
import './MenuBar.css'


class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // // States that manage the status of the dropdown
            // tagdropdown: false,
            // cpdropdown: false,
                     
        }

        this.openDropdown = this.openDropdown.bind(this)
        this.onCardTypeSelected = this.onCardTypeSelected.bind(this)
        
        
    }

    
    // Function that activates the dropdown for both checkpoints and tags (this is determined by the argument filter)
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
    // Function that utilizes a callback to pass the value of the flash/quiz card selection to parent(FlashCardContainer)
    onCardTypeSelected(event) {
        this.props.hoverGrab(event.currentTarget.value)
    }



    render() {
        return (
            <div className="menubar" ref="menubar">
                <button className="menuitem startbtn menubtn" onClick={() => {
                    if(!this.props.initialRound) {
                        this.props.startFunc()
                    } else {
                        this.props.startFunc()
                    }
                }}>{this.props.initialRound ? "Stop" : "Start"}</button>
                <button className="menuitem shufflebtn menubtn" onClick={this.props.shuffle}>Shuffle</button>
                <div className="menuitem cardswitch">
                    <ul className="answerColumn">
                        <li>
                            <label>
                                <input className="with-gap" name="cardtype" type="radio" value="on" onChange={this.onCardTypeSelected} />
                                <span className="checkboxStyle">FlashCards</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input className="with-gap" name="cardtype" type="radio" value="off"  onChange={this.onCardTypeSelected}/>
                                <span className="checkboxStyle">QuizCards</span>
                            </label>
                        </li>
                    </ul>
                </div>
                {// <div className="menuitem tagdrop">
                //     <button className="dropbtn menubtn" onClick={() => this.openDropdown("tag")}>Sort by Tag</button>
                //     <form className="dropdown-items" ref="dropdownmenu">
                //         {tags.map((tag,iterator) => {
                //             return (
                //                 <p key={iterator}>
                //                     <label>
                //                         <input 
                //                         type="checkbox" 
                //                         name={`droptags${iterator}`} 
                //                         value={tag} 
                //                         checked={this.props.checkedTags(tag)} 
                //                         onChange={this.props.handleTagSelection}
                //                         />
                //                         <span>{tag}</span>
                //                     </label>
                //                 </p>
                //             )
                //         })}
                        
                        
                //     </form>
                // </div>
                // <div className="menuitem cpdrop">
                //     <button className="dropbtn menubtn" onClick={() => this.openDropdown("checkpoint")}>Sort by Checkpoint</button>
                //     <form className="dropdown-items" ref="dropdownmenuc">
                //         {checkpoints.map((cp,iterator) => {
                //             return (
                //                 <p key={iterator + 100}>
                //                     <label>
                //                         <input 
                //                         type="checkbox" 
                //                         name={cp} 
                //                         value={iterator+1}
                //                         checked={this.props.checkedCP(iterator)} 
                //                         onChange={this.props.handleCPSelection}
                //                         />
                //                         <span>{cp}</span>
                //                     </label>
                //                 </p>
                //             )
                //         })}  
                    
                //     </form>}
                //</div>
            }
            </div>
        )
    }
}

export default MenuBar;