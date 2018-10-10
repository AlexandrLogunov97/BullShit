import React, { Component } from 'react';
import  CreateNote  from "./components/CreateNote";
import ModifyNote from "./components/ModifyNote";
import { SimpleNoteList } from './components/SimpleNoteList'
import { AdvancedNoteList } from './components/AdvancedNoteList';
import { Note } from './components/Note';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }
  onChangeFilterMode=(e)=> {
    this.props.onChangeFilterMode(e.target.value);
  }
  onUpdateFilterField=(e)=>{
  }
  onChangeFilterField=(e)=>{
    /*let newNotes;
    if (!e.target.value) {
      newNotes = this.state.notes;
    }
    else {
      let noteList = this.state.notes;
      let newNotes = [];
      if (this.state.filterMode === 'Tags') {
        newNotes = [];
        noteList.forEach(note => {
          note.tags.forEach(tag => {
            if (tag.trim().toLowerCase().includes(e.target.value.trim().toLowerCase()) && newNotes.indexOf(note) === -1) {
              newNotes.push(note);
            }
          })
        });

      }
      else if (this.state.filterMode === 'Title') {
        newNotes = [];
        noteList.forEach(note => {
          if (note.title.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
            newNotes.push(note);
          }
        })

      }
      this.setState({
        filteredNotes: newNotes
      });
    }*/
    this.props.onChangeFilterText( e.target.value );
    this.props.onChangeFilter();
  }
  onSelectNoteMode=(e)=>{
    this.props.onSelectMode(e.target.value);
  }
  onSelectCreateMode=(e)=>{
    this.props.onSelectMode('Create');
  }
  onDeleteNote=()=>{
    this.props.onDeleteNote(this.props.selectedNote);
  }
  onChangeNoteList=(e)=>{
    this.props.onSelectTypeNoteList(e.target.value);
  }
  getField() {
    let field;
    if (this.props.mode === 'Create')
      field = <CreateNote onCreateNote={this.onCreateNote} />;
    else if (this.props.mode === 'View')
      field = <Note note={this.props.selectedNote} />
    else if (this.props.mode === 'Modify')
      field = <ModifyNote />
    return field;
  }
  getNoteList() {
    let noteList;
    if (this.props.noteList === 'Simple')
      noteList = <SimpleNoteList notes={this.props.filteredNotes}/>
    else if (this.props.noteList === 'Advanced')
      noteList = <AdvancedNoteList notes={this.props.filteredNotes}/>

    return noteList;
  }
  render() {
    let field = this.getField();
    let noteList = this.getNoteList();
    return (
      <div className='App'>
        <div className='panel-left'>
          <div className='panel-top'>
            <input placeholder='Filter' onKeyUp={this.onUpdateFilterField} onChange={this.onChangeFilterField} className='item-top-justify' />
            <select onChange={this.onChangeFilterMode}>
              <option>Title</option>
              <option>Tags</option>
            </select>
          </div>
          <div className='item-devide'></div>
          {
            noteList
          }
        </div>
        <div className='panel-right'>
          <div className='panel-top'>
            <label for='modeView'>View </label>
            <select id='modeView' onChange={this.onChangeNoteList}>
              <option>Simple</option>
              <option>Advanced</option>
            </select>
            <label for='mode'> Mode </label>
            <select id='mode' onChange={this.onSelectNoteMode}>
              <option>View</option>
              <option>Modify</option>
            </select>
            <button className='item-right' onClick={this.onDeleteNote}>delete</button>
            <button className='item-right' onClick={this.onSelectCreateMode}>Add</button>
          </div>
          <div className='item-devide'></div>
          <div className='item-justify'>
            {
              field
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    notes: state.notes.notes,
    selectedNote: state.notes.selectedNote,
    updatingNote: state.notes.updatingNote,
    filteredNotes: state.notes.filteredNotes,
    mode: state.notes.mode,
    noteList: state.notes.noteList
  }),
  dispatch => ({
    onDeleteNote: (note) => {
      dispatch({ type: 'DELETE_NOTE', note: note })
    },
    onSelectTypeNoteList: (type)=>{
      dispatch({ type: 'SELECT_TYPE_NOTE_LIST', typeNoteList: type })
    },
    onSelectMode: (mode)=>{
      dispatch({ type: 'SELECT_MODE', mode: mode })
    },
    onSetUpdatingNote: (mode)=>{
      dispatch({ type: 'SELECT_MODE', mode: mode })
    },
    onChangeFilterMode:(mode)=>{
      dispatch({ type: 'FILTER_MODE', mode: mode })
    },
    onChangeFilterText:(filterText)=>{
      dispatch({ type: 'FILTER_TEXT_CHANGE', filterText: filterText })
    },
    onChangeFilter:()=>{
      dispatch({ type: 'FILTER_CHANGE' })
    }
  })
)(App);
