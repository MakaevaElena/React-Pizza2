import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params, thunkAPI) => {
  const { category, order, sortBy, search, currentPage } = params;
  const res = await axios.get(
    `https://6336e2ec5327df4c43cb898a.mockapi.io/items?page=${currentPage}&search=${search}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      console.log('идет запрос');
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log('данные получены');
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log('была ошибка');
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizzas;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
