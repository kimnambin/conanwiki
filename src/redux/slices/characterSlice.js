// 캐릭터 가져오기

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchCharacters,
  fetchCharacterDetail,
  fetchCouple,
} from '../../api/characterApi';

export const character = createAsyncThunk('conan/characters', async () => {
  const res = await fetchCharacters();
  return res;
});

export const characterDetail = createAsyncThunk(
  'conan/characterDetail',
  async id => {
    const res = await fetchCharacterDetail(id);
    return res;
  },
);

export const coupleGet = createAsyncThunk('conan/couple', async () => {
  const res = await fetchCouple();
  return res;
});

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    list: [],
    coupleList: [],
    select: null,
    loading: false,
    error: null,
    searchList: [],
    searchText: '',
  },

  reducers: {
    setSearchTextText: (state, action) => {
      state.searchText = action.payload;

      state.searchList = state.list.filter(finditem =>
        finditem.name.korean.name
          .toLowerCase()
          .includes(action.payload.toLowerCase()),
      );
    },
  },

  //비동기 작업의 결과물들
  extraReducers: builder => {
    builder
      .addCase(character.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(character.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.searchList = action.payload;
      })

      .addCase(character.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(characterDetail.pending, (state, action) => {
        state.select = action.payload;
      })

      .addCase(coupleGet.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(coupleGet.fulfilled, (state, action) => {
        state.loading = false;
        state.coupleList = action.payload;
      })

      .addCase(coupleGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setSearchTextText} = characterSlice.actions;

export default characterSlice.reducer;
