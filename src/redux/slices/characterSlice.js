// 캐릭터 가져오기

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchCharacters, fetchCharacterDetail} from '../../api/characterApi';

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

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    list: [],
    select: null,
    loading: false,
    error: null,
  },

  //선택된 캐릭터 초기화용
  reducers: {
    clearCharacterDetail: state => {
      state.select = null;
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
      })

      .addCase(character.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(characterDetail.pending, (state, action) => {
        state.select = action.payload;
      });
  },
});

export const {clearCharacterDetail} = characterSlice.actions;

export default characterSlice.reducer;
