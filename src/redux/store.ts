import {configureStore} from '@reduxjs/toolkit';
import characterSlice from './slices/characterSlice';
import movieSlice from './slices/movieSlice';
import episodeSlice from './slices/episodeSlice';
import modalSlice from './slices/modalSlice';

const store = configureStore({
  reducer: {
    characterKey: characterSlice,
    movieKey: movieSlice,
    episodeKey: episodeSlice,
    modalKey: modalSlice,
  },
});
export type StoreDispatch = typeof store.dispatch;

export default store;
