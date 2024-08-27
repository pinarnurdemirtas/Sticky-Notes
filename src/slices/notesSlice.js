import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedNotes: [], 
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            
            state.savedNotes.push(action.payload);
        },
        deleteNote: (state, action) => {
           
            state.savedNotes = state.savedNotes.filter(note => note.id !== action.payload);
        },
        updateNote: (state, action) => {
           
            const index = state.savedNotes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.savedNotes[index] = action.payload;
            }
        },
    },
});


export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
