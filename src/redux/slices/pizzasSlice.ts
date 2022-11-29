import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasPropsType = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: number;
};

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchPizzas = createAsyncThunk<PizzaBlockType[], FetchPizzasPropsType>(
  'pizzas/fetchPizzas',
  async (params: FetchPizzasPropsType, thunkAPI) => {
    const { category, order, sortBy, search, currentPage } = params;
    const res = await axios.get<PizzaBlockType[]>(
      `https://6336e2ec5327df4c43cb898a.mockapi.io/items?page=${currentPage}&search=${search}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    );
    return res.data;
  },
);

type PizzaBlockType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceInterface {
  items: PizzaBlockType[];
  status: Status;
}

const initialState: PizzasSliceInterface = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaBlockType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        // console.log('идет запрос');
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
        // console.log('данные получены');
      })
      .addCase(fetchPizzas.rejected, (state) => {
        // console.log('была ошибка');
        state.status = Status.ERROR;
        state.items = [];
      });
  },

  // TS в extraReducers использует только builder
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     console.log('идет запрос');
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //     console.log('данные получены');
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log('была ошибка');
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizzas;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
