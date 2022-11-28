import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Sort from '../../components/Sort';
import { RootState } from '../store';

type SortType = {
  name: string;
  sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title';
};

interface FilterSliceInterface {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

const initialState: FilterSliceInterface = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
