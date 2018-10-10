import React, { Component } from 'react';
import { compiler } from 'markdown-to-jsx';
import TagList  from './TagList';

export class Note extends Component {
  render() {
    return this.props.note ? (
      <div>
        <h4>Tags</h4><TagList tags={this.props.note.tags}></TagList><br />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>{this.props.note.title}</h2>
        <h3>{compiler(this.props.note.entry)}</h3>
      </div>
    ) : (<h2>Empty</h2>);
  }
}
