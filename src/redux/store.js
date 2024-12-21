import {configureStore} from '@reduxjs/toolkit';
import characterSlice from './slices/characterSlice';

const store = configureStore({
  reducer: {
    character: characterSlice,
    // movie: movieSlice, //나중에 구현 예정
    // episode: episode, // 나중에 구현 예정
  },
});

export default store;
