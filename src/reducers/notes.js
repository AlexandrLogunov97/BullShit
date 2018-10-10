const initialNotes={
    notes: [
        {
            title: 'Note 1',
            entry: 'Text for note 1',
            tags: ['One '],
            date: new Date()
        },
        {
            title: 'Note 2',
            entry: 'Text for note 2',
            tags: ['One ', 'Two '],
            date: new Date()
        },
        {
            title: 'Note 3',
            entry: 'Text for note 3',
            tags: ['One ', 'Two ', 'three '],
            date: new Date()
        }
    ]
}
const initialState = {
    notes: initialNotes.notes,
    filteredNotes: initialNotes.notes,
    selectedNote: initialNotes.notes[0],
    creatingNote: {
        title: '',
            entry: '',
            tags: [],
            date: new Date()
    },
    updatingNote: initialNotes.notes[0],
    filterText: '',
    noteList: 'Simple',
    filterMode: 'Title',
    mode: 'View',
    tag: ''
}

export default function notes(state = initialState, action) {
    switch (action.type) {
        case 'SELECT_TYPE_NOTE_LIST': {
            console.log(state.notes);
            return Object.assign({},state,{
               noteList: action.typeNoteList
            });
        }
        case 'SELECT_MODE':{
            return Object.assign({},state,{
                mode: action.mode
            });
        }
        case 'ADD_NOTE': {
            return Object.assign({},state,{
                notes: [...state.notes, state.creatingNote],
                filteredNotes: [...state.notes, state.creatingNote],
                creatingNote: {
                    title: '',
                    entry: '',
                    tags: [],
                    date: new Date().toDateString()
                },
                selectedNote: state.filteredNotes[state.notes.length-1],
                mode: 'View'
            });
        }
        case 'CHANGE_CREATING_NOTE_TITLE':{
            let note=Object.assign({},state.creatingNote);
            note.title=action.title;
            return Object.assign({},state,{
                creatingNote: note
            });
        }
        case 'CHANGE_CREATING_NOTE_ENTRY':{
            let note=Object.assign({},state.creatingNote);
            note.entry=action.entry;
            return Object.assign({},state,{
                creatingNote: note
            });
        }
        case 'CHANGE_UPDATING_NOTE_TITLE':{
            let note=Object.assign({},state.updatingNote);
            note.title=action.title;
            return Object.assign({},state,{
                updatingNote: note
            });
        }
        case 'CHANGE_UPDATING_NOTE_ENTRY':{
            let note=Object.assign({},state.updatingNote);
            note.entry=action.entry;
            return Object.assign({},state,{
                updatingNote: note
            });
        }
        case 'FILTER_MODE':{
            return Object.assign({},state,{
                filterMode: action.mode
            });
        }
        case 'FILTER_TEXT_CHANGE':{          
            return Object.assign({},state,{
                filterText: action.filterText
            });
        }
        case 'FILTER_CHANGE':{
            let newNotes=[];
            if (!action.filterText) {
                newNotes = [...state.notes];
              }
              else {
                let noteList = [...state.notes];
                let newNotes = [];
                if (state.filterMode === 'Tags') {
                  newNotes = [];
                  noteList.forEach(note => {
                    note.tags.forEach(tag => {
                      if (tag.trim().toLowerCase().includes(action.filterText.trim().toLowerCase()) && newNotes.indexOf(note) === -1) {
                        newNotes.push(note);
                      }
                    })
                  });
          
                }
                else if (state.filterMode === 'Title') {
                  newNotes = [];
                  noteList.forEach(note => {
                    if (note.title.trim().toLowerCase().includes(action.filterText.trim().toLowerCase())) {
                      newNotes.push(note);
                    }
                  })
          
                }
                return Object.assign({},state,{
                    filteredNotes: [...newNotes],
                    selectedNote: newNotes[0]
                  });
              }
        }
        case 'SELECT_UPDATED_NOTE': {
            break;
        }
        case 'UPDATE_NOTE': {
            let notes=[...state.notes];
            let index=notes.indexOf(state.selectedNote);
            notes[index]=state.updatingNote;
            return Object.assign({},state,{
                notes: notes,
                filteredNotes: notes
            });
        }
        case 'DELETE_NOTE': {
            let newNotes=state.notes.filter(note => note !== state.selectedNote);

            return Object.assign({},state,{
                notes: newNotes,
                filteredNotes: newNotes,
                selectedNote: newNotes[0]
            });
        }
        case 'CHANGE_TAG':{
            return Object.assign({},state,{
                tag: action.tag
            });
        }
        case 'ADD_TAG_TO_CREATING_NOTE':{
            let note=Object.assign({},state.creatingNote);
            note.tags = [
                ...note.tags,
                state.tag
            ];

            return Object.assign({},state,{
                creatingNote: note,
                tag: ''
            });
        }
        case 'ADD_TAG_TO_UPDATING_NOTE':{
            let note=Object.assign({},state.updatingNote);
            note.tags = [
                ...note.tags,
                state.tag
            ];

            return Object.assign({},state,{
                updatingNote: note,
                tag: ''
            });
        }
        case 'REMOVE_TAG_TO_CREATING_NOTE':{
            let note=Object.assign({},state.creatingNote);
            let index = note.tags.indexOf(action.tag);
            note.tags=note.tags.filter(tag=>tag!==action.tag);
            return Object.assign({},state,{
                creatingNote: note
            });
        }
        case 'REMOVE_TAG_TO_UPDATING_NOTE':{
            let note=Object.assign({},state.updatingNote);
            let index = note.tags.indexOf(action.tag);
            note.tags=note.tags.filter(tag=>tag!==action.tag);
            
            return Object.assign({},state,{
                updatingNote: note
            });
        }
        case 'SELECT_NOTE': {
            return Object.assign({},state,{
                selectedNote:  action.selectedNote,
                updatingNote: action.selectedNote,
                tag: ''
            });
        }
    }
    return state;
}