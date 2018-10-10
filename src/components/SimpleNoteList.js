import React, { Component } from 'react';
import SimpleNote from './SimpleNote';
import '../App.css';

export class SimpleNoteList extends Component {
  render() {
    return (
      <div className='item-justify simple-note-list'>
        {
            this.props.notes.map(note=>(
                <SimpleNote note={note}></SimpleNote>
            ))
        }
      </div>
    );
  }
}
