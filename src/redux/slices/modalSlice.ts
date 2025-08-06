import {createSlice} from '@reduxjs/toolkit';
import {ModalState} from '../../types/api.model';

const initialState: ModalState = {
  isOpen: false,
  selectedSeries: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,

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
