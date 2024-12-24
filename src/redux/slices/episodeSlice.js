import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {epicodefetch} from '../../api/episodeApi';

export const episodesApiGet = createAsyncThunk('conan/episodes', async () => {
  const res = await epicodefetch();
  return res;
});

const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [],
    error: null,
    loading: false,
  },

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
        state.error = action.error.message;
      });
  },
});

export default episodeSlice.reducer;
