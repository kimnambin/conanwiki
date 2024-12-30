import {createSlice} from '@reduxjs/toolkit';

const mergeSlice = createSlice({
  name: 'mergeKey',
  initialState: {
    characterSearchText: '',
    movieSearchText: '',
    characters: [],
    movies: [],
  },

  reducers: {
    setCharacterSearchText(state, action) {
      state.characterSearchText = action.payload;
    },
    setMovieSearchText(state, action) {
      state.movieSearchText = action.payload;
    },
    setCharacters(state, action) {
      state.characters = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const {
  setCharacterSearchText,
  setMovieSearchText,
  setCharacters,
  setMovies,
} = mergeSlice.actions;

export default mergeSlice.reducer;
