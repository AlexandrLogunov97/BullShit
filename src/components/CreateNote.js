import React, { Component } from 'react';
import TagList from './TagList';
import '../App.css';
import { connect } from 'react-redux';

class CreateNote extends Component {
    constructor(props) {
        super(props);
    }
    onCreatedNote = (e) => {
        if (this.props.creatingNote.title.trim().toLowerCase())
            this.props.onAddNote();
    }
    onCreatedTitleChanging = (e) => {
        this.props.onTitleChange(e.target.value);
    }
    onCreatedEntryChanging = (e) => {
        this.props.onEntryCahnge(e.target.value);
    }
    onCreatedTagChange = (e) => {
        this.props.onTagChange(e.target.value);
    }
    onCreatedTag = (e) => {
        if (this.props.tag)
            if (this.props.tag) {
                if (!this.props.creatingNote.tags.find(tag => { return tag.trim().toLowerCase() === this.props.tag.trim().toLowerCase() ? tag : null }))
                    this.props.onTagAdd();
            }

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