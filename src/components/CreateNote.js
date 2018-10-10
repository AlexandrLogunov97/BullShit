import React, { Component } from 'react';
import TagList from './TagList';
import '../App.css';
import { connect } from 'react-redux';

class CreateNote extends Component {
    constructor(props) {
        super(props);
    }
    onCreatedNote = (e) => {
        //if(this.state.note.title.trim().toLowerCase())
        // this.props.onCreateNote(this.state.note);
        if (this.props.creatingNote.title.trim().toLowerCase())
            this.props.onAddNote();
    }
    onCreatedTitleChanging = (e) => {
        /*let note = this.state.note;
        note.title = e.target.value;

        if (note.title)
            this.setState({
                note: note
            });*/
        this.props.onTitleChange(e.target.value);
    }
    onCreatedEntryChanging = (e) => {
        /*let note = this.state.note;
        note.entry = e.target.value;
        if (note.entry)
            this.setState({
                note: note
            });
            */
        this.props.onEntryCahnge(e.target.value);
    }
    onCreatedTagChange = (e) => {
        /* this.setState({
             tag: e.target.value
         });
         */
        this.props.onTagChange(e.target.value);
    }
    onCreatedTag = (e) => {
        /*let note = this.state.note;
        if (this.state.tag) {
            if (!note.tags.find(tag => { return tag.trim().toLowerCase() === this.state.tag.trim().toLowerCase() ? tag : null }))
                note.tags.push(this.state.tag + ' ');
        }
        this.setState({
            note: note,
            tag: ''
        });*/
        if (this.props.tag)
            if (this.props.tag) {
                if (!this.props.creatingNote.tags.find(tag => { return tag.trim().toLowerCase() === this.props.tag.trim().toLowerCase() ? tag : null }))
                    this.props.onTagAdd();
            }

    }
    onUpdateTags(newTags) {
        /*let note = this.state.note;
        note.tags = newTags;
        this.setState({
            note: note
        });*/
    }
    render() {
        let tags = <TagList tagState='modify' tags={this.props.creatingNote.tags} />
        return (
            <div>
                <h3 className='item-justify'>Create</h3>
                <input className='item-justify' placeholder='Title (not empty)' onChange={this.onCreatedTitleChanging} /><br />
                <div className='item-justify'>
                    <input className='item-inner-justify' placeholder='Tag' onChange={this.onCreatedTagChange} value={this.props.tag} /><button onClick={this.onCreatedTag}>add</button>
                    {
                        tags
                    }
                </div>
                <textarea className='item-justify textarea' placeholder='Entry' onChange={this.onCreatedEntryChanging}></textarea><br />
                <button className='item-right' onClick={this.onCreatedNote}>Create</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        //notes: state.notes.notes
        tag: state.notes.tag,
        creatingNote: state.notes.creatingNote
        
    }),
    dispatch => ({
        onAddNote: (note) => {
            dispatch({ type: 'ADD_NOTE', note: note })
        },
        onTitleChange: (title) => {
            dispatch({ type: 'CHANGE_CREATING_NOTE_TITLE', title: title })
        },
        onEntryCahnge: (entry) => {
            dispatch({ type: 'CHANGE_CREATING_NOTE_ENTRY', entry: entry })
        },
        onTagChange: (tag) => {
            dispatch({ type: 'CHANGE_TAG', tag: tag })
        },
        onTagAdd: () => {
            dispatch({ type: 'ADD_TAG_TO_CREATING_NOTE' })
        }
    })
)(CreateNote);