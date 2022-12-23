import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(state, '=== state');
      console.log(action, '=== action');
      state.items = [...state.items, action.payload];
    },
    remove: (state, action) => {
      console.log(state.items, '=== stateItems');
      console.log(action, '=== action');
      state.items = action.payload;
    },
    filter: (state, action) => {
      console.log(state.items, '=== stateItems');
      console.log(action, '=== filter');
      state.filter = action.payload;
    },
  },
});
console.log(contactsSlice, '=== contactsSlice');
// Action creators are generated for each case reducer function
export const { add, remove, filter } = contactsSlice.actions;

export default contactsSlice.reducer;
