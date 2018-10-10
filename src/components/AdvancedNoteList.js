import React, { Component } from 'react';
import AdvancedNote from './AdvancedNote';

import '../App.css';

export class AdvancedNoteList extends Component {
  render() {
    return (
      <div size={this.props.notes.length} className='item-justify simple-note-list'>
        {
            this.props.notes.map(note=>(
                <AdvancedNote note={note}></AdvancedNote>
            ))
        }
      </div>
    );
  }
}
