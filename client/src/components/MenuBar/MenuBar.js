import React , { Component } from 'react';
import './MenuBar.css'


const checkpoints = ["Bash","HTML/CSS/Git","JavaScript","JavaScript/jQuery","Timers/API","Node"];
const tags = ["React","Vocab","SQL","Arrays","Mongo","JavaScript"]

class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tagdropdown: false,
            cpdropdown: false,
            selectedTags: [],
            selectedCP: []
            
        }

        this.openDropdown = this.openDropdown.bind(this)
        this.onCardTypeSelected = this.onCardTypeSelected.bind(this)
        this.handleTagSelection = this.handleTagSelection.bind(this)
        this.handleCPSelection = this.handleCPSelection.bind(this)
        this.sendTheFilters = this.sendTheFilters.bind(this)
    }

    sendTheFilters() {
        const tag = this.state.selectedTags.join('+').toLowerCase()
        this.props.sessionFilters(tag)
        const cp = this.state.selectedCP.join('+').toLowerCase()
        this.props.sessionCP(cp)
    }
    
            
        
        
    

    handleTagSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.selectedTags.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedTags.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.selectedTags, newSelection];
		}
		this.setState({ selectedTags: newSelectionArray }, () => console.log('tag selection', this.state.selectedTags));
    }
    
    handleCPSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.selectedCP.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedCP.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.selectedCP, newSelection];
		}
		this.setState({ selectedCP: newSelectionArray }, () => console.log('CP selection', this.state.selectedCP));
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
                <button className="menuitem menubtn" onClick={() => {
                    if(!this.props.initialRound) {
                        this.props.startFunc()
                        this.sendTheFilters()
                    } else {
                        this.props.startFunc()
                    }
                }}>{this.props.initialRound ? "Stop" : "Start"}</button>
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
                        {tags.map((tag,iterator) => {
                            return (
                                <p key={iterator}>
                                    <label>
                                        <input 
                                        type="checkbox" 
                                        name={`droptags${iterator}`} 
                                        value={tag} 
                                        checked={this.state.selectedTags.indexOf(tag) > -1} 
                                        onChange={this.handleTagSelection}
                                        />
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
                                        <input 
                                        type="checkbox" 
                                        name={`dropcp${iterator}`} 
                                        value={iterator}
                                        checked={this.state.selectedCP.indexOf(cp) > -1} 
                                        onChange={this.handleCPSelection}
                                        />
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