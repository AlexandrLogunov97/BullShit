import React, { Component } from 'react';
import TagList from './TagList';
import { connect } from 'react-redux';
import '../App.css';

class ModifyNote extends Component {
    constructor(props) {
        super(props);
    }
    onModifyedNote = (e) => {
        if (this.props.updatingNote.title)
            this.props.onUpdateNote();
    }
    onModifyedTitleChanging = (e) => {
        this.props.onTitleChange(e.target.value);
    }
    onModifyedEntryChanging = (e) => {
        this.props.onEntryChange(e.target.value);
    }
    onCreatedTagChange = (e) => {
        this.props.onTagChange(e.target.value);
    }
    onCreatedTag = (e) => {
        if (this.props.tag) {
            if (!this.props.updatingNote.tags.find(tag => { return tag.trim().toLowerCase() === this.props.tag.trim().toLowerCase() ? tag : null }))
                this.props.onAddTag();
        }
    }
    render() {
        return this.props.updatingNote ? (
            <div>
                <h3 className='item-justify'>Modify</h3>
                <input className='item-justify' placeholder='Title' onChange={this.onModifyedTitleChanging} value={this.props.updatingNote.title} /><br />
                <div className='item-justify'>
                    <input className='item-inner-justify' placeholder='Tag' onChange={this.onCreatedTagChange} value={this.props.tag} /><button onClick={this.onCreatedTag}>add</button>
                    <TagList tagState='modify' tags={this.props.updatingNote.tags} />
                </div>
                <textarea className='item-justify textarea' placeholder='Entry' onChange={this.onModifyedEntryChanging} value={this.props.updatingNote.entry}></textarea><br />
                <button className='item-right' onClick={this.onModifyedNote}>Modify</button>
            </div>
        ) : (<h2>Empty</h2>);
    }
}
export default connect(
    state => ({
        updatingNote: state.notes.updatingNote,
        tag: state.notes.tag
    }),
    dispatch => ({
        onUpdateNote: () => {
            dispatch({ type: 'UPDATE_NOTE' })
        },
        onTitleChange: (title) => {
            dispatch({ type: 'CHANGE_UPDATING_NOTE_TITLE', title: title })
        },
        onEntryChange: (entry) => {
            dispatch({ type: 'CHANGE_UPDATING_NOTE_ENTRY', entry: entry })
        },
        onTagChange: (tag) => {
            dispatch({ type: 'CHANGE_TAG', tag: tag })
        },
        onAddTag: () => {
            dispatch({ type: 'ADD_TAG_TO_UPDATING_NOTE' })
        }
    })
)(ModifyNote);