import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, MovieDetail} from '../../api/movieApi';

export const fetchMovie = createAsyncThunk('conan/movie', async () => {
  const res = await Movie();
  return res;
});

export const fetchMovieDetail = createAsyncThunk(
  'conan/moviedetail',
  async id => {
    const res = await MovieDetail(id);
    return res;
  },
);

const MovieSlice = createSlice({
  name: 'movie',
  initialState: {
    list: [],
    loading: false,
    error: null,
    filterList: [],
    searchMovie: '',
  },

  reducers: {
    setMovieSearch: (state, action) => {
      state.searchMovie = action.payload;
      state.filterList = action.payload
        ? state.list.filter(item => item.title.includes(action.payload))
        : [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchMovie.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filterList = action.payload;
      })

      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMovieDetail.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.select = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setMovieSearch} = MovieSlice.actions;

export default MovieSlice.reducer;
