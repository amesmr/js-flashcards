import React , { Component } from 'react';
import './MenuBar.css'
import { Dropdown, Button, NavItem } from 'react-materialize';


class MenuBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tagdropdown: false,
            tags: ["Item"]
        }

        this.openDropdown = this.openDropdown.bind(this)
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
        
            
    }


    render() {
        return (
            <div className="menubar">
                <button className="menuitem">Shuffle</button>
                <button className="menuitem">Reset</button>
                <div className="menuitem">
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" checked />
                            <span>FlashCards</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input className="with-gap" name="cardtype" type="radio" />
                            <span>QuizCards</span>
                        </label>
                    </p>
                </div>
                <div className="menuitem">
                    <button className="dropbtn" onClick={() => this.openDropdown("tag")}>Drop me!</button>
                    <form className="dropdown-items" ref="dropdownmenu">
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span>Red</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <span>Red</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <span>Red</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <span>Red</span>
                            </label>
                        </p>
                    </form>

                </div>
                <div className="menuitem">
                    <Dropdown trigger={<button className="dropbtn">Drop me!</button>}>
                        <NavItem>Something</NavItem>
                        <NavItem>Something</NavItem>
                        <NavItem>Something</NavItem>
                        <NavItem>Something</NavItem>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default MenuBar;