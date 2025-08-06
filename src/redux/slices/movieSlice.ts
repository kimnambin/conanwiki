import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, MovieDetail} from '../../api/movieApi';
import {MovieState, MovieType} from '../../types/api.model';

const initialState: MovieState = {
  movieList: [],
  loading: false,
  error: null,
  filtermovieList: [],
  searchMovie: '',
  select: null,
};

export const fetchMovie = createAsyncThunk('conan/movie', async () => {
  const res = await Movie();
  return res;
});

export const fetchMovieDetail = createAsyncThunk(
  'conan/moviedetail',
  async (id: number) => {
    const res = await MovieDetail(id);
    return res;
  },
);

const MovieSlice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    setMovieSearch: (state, action) => {
      state.searchMovie = action.payload;
      state.filtermovieList = action.payload
        ? state.movieList.filter(item => item.title.includes(action.payload))
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
        state.movieList = action.payload;
        state.filtermovieList = action.payload;
      })

      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(fetchMovieDetail.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.select = action.payload?.results || null;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const {setMovieSearch} = MovieSlice.actions;

export default MovieSlice.reducer;
