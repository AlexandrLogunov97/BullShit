import React, { Component } from 'react';
import '../App.css';
import { TagList } from './TagList';
import { connect } from 'react-redux';

class AdvancedNote extends Component {
    constructor(props) {
        super(props);
    }
    getSelectNote=(e) =>{
        this.props.onSelectNote(this.props.note);
    }
    render() {
        let nowDate = new Date();
        let isSelected=this.props.selectedNote===this.props.note?'selected':'noneSelected';
        let className=`advanced-note ${isSelected}`;
        return (
            <div className={className} onClick={this.getSelectNote}>
                {
                    this.props.note.title

                }<br/>
                date: {
                    this.props.note.date.toDateString()
                }
                <br/>
                tags: ({
                    this.props.note.tags.toString()
                }) 
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
(AdvancedNote);