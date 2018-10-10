import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';

class SimpleNote extends Component {
    constructor(props) {
        super(props);
    }
    getSelectNote=(e)=>{
        this.props.onSelectNote(this.props.note);
    }
    render() {
        let isSelected=this.props.selectedNote===this.props.note?'selected':'noneSelected';
        let className=`simple-note ${isSelected}`;
        return (
            <div className={className} onClick={this.getSelectNote}>
                {this.props.note.title}
            </div>
        );
    }
}
export default connect(
    state=>({
        selectedNote: state.notes.selectedNote
    }),
    dispatch=>({
        onSelectNote: (note)=>{
            dispatch({ type: 'SELECT_NOTE', selectedNote: note })   
        }
    })
)
(SimpleNote);