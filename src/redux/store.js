import {configureStore} from '@reduxjs/toolkit';
import characterSlice from './slices/characterSlice';
import movieSlice from './slices/movieSlice';

const store = configureStore({
  reducer: {
    character: characterSlice,
    movie: movieSlice,
    // episode: episode, // 나중에 구현 예정
  },
});

export default store;
