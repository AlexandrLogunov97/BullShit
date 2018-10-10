import React, { Component } from 'react';
import { Tag } from './Tag';
import { connect } from 'react-redux';
import '../App.css';

class TagList extends Component {
    onDeleteTag = (tag) => {
        if (this.props.tagState) {
            if (this.props.mode === 'Create') {
                this.props.onRemoveTagFromCreatingNote(tag);
            
            }
            else if (this.props.mode === 'Modify') {
                this.props.onRemoveTagFromUpdatingNote(tag);
                console.log(tag,' in modify');
            }
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                {
                    this.props.tags.map(tag => (
                        <Tag tag={tag} onDeleteTag={this.onDeleteTag}></Tag>
                    ))
                }
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        return  ({
            mode: state.notes.mode,
            tags: ownProps.tags
        })
    },
    (dispatch, ownProps) => ({
        onRemoveTagFromUpdatingNote: (tag) => {
            dispatch({ type: 'REMOVE_TAG_TO_UPDATING_NOTE', tag: tag })
        },
        onRemoveTagFromCreatingNote: (tag) => {
            dispatch({ type: 'REMOVE_TAG_TO_CREATING_NOTE', tag: tag })
        }
    })
)(TagList);