import {createSlice} from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    selectedSeries: null,
  },

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedSeries = action.payload;
    },

    closeModal: (state, action) => {
      state.isOpen = false;
      state.selectedSeries = null;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;
