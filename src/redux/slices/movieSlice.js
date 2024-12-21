import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, MovieDetail} from '../../api/movieApi';

const fetchMovie = createAsyncThunk('conan/movie', async () => {
  const res = await Movie();
  return res;
});

const fetchMovieDetail = createAsyncThunk('conan/moviedetail', async () => {
  const res = await MovieDetail();
  return res;
});

const MovieSlice = createSlice({
  name,
  initialState,

  reducres: {},
});
