import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {epicodefetch} from '../../api/episodeApi';
import {EpisodeState} from '../../types/api.model';

const initialState: EpisodeState = {
  list: [],
  error: null,
  loading: false,
};

export const episodesApiGet = createAsyncThunk('conan/episodes', async () => {
  const res = await epicodefetch();
  return res;
});

const episodeSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(episodesApiGet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(episodesApiGet.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(episodesApiGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default episodeSlice.reducer;
