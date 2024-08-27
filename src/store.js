import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice'; 

const store = configureStore({
  reducer: {
    notes: notesReducer
  }
});

export default store;
