import React, { Component } from 'react'
import './MenuForm.css';
import API from '../../utils/API';


const checkpoints = ["Bash","HTML/CSS/Git","JavaScript","JavaScript/jQuery","Timers/API","Node","Express","MySQL","Mongo","ES6 and React","Computer Science","Java","Laravel/PHP","Python/Django"];

export default class MenuBar extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         tags: []
      }
    }

    componentDidMount() {
        API.getAllSubjects()
            .then(res => {
                console.log(res)
                this.setState({
                    tags: res.data

                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {
        return (
        <div className="" >
            <form className="form-component container">
                <div className="form-section row studyStyle">
                    <h6 className='landingStudyTitle'>Study Style</h6>
                    <p className="col m6 radioSlt">
                        <label>
                            <input className="with-gap" name="content-type" type="radio" value="FlashCards" onChange={this.props.handleFormSelection}/>
                            <span className="checkboxStyle">FlashCards</span>
                        </label>
                    </p>
                    <p className="col m6 radioSlt">
                        <label>
                            <input className="with-gap" name="content-type" type="radio" value="Quiz" onChange={this.props.handleFormSelection}/>
                            <span className="checkboxStyle">Take Quiz</span>
                        </label>
                    </p>
                </div>
                <div className="form-section row">
                    <h6>Sort by Checkpoint</h6>
                    <ul>
                        {checkpoints.map((cp,iterator) => {
                            return (
                                <li key={iterator + 100} id="checkBox">
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
                    <h6>Sort by Topic</h6>
                    <ul>
                        {this.state.tags.map((tag,iterator) => {
                            let tagParts = tag.split(' ');
                            let tagName = tagParts[0];
                            let tagNumber = tagParts[1];
                            return (
                                <li key={iterator + 100} id="checkBox">
                                    <label>
                                        <input 
                                        type="checkbox"
                                        name={tagName} 
                                        value={tagName}
                                        checked={this.props.checkedTags(tagName)} 
                                        onChange={this.props.handleTagSelection}
                                        />
                                        <span>{tagName} {tagNumber}</span>
                                    </label>
                                </li>
                            )
                        })} 
                    </ul>
                </div>
            </form>
        </div>
        )
    }
}
