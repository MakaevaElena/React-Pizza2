import { SortPropertyEnum, Status } from '../../const ';

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FetchPizzasPropsType = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: number;
};

export type PaginationPropsType = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export type SortItemType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type SortPropsType = {
  value: SortItemType;
};

export type CategoriesPropsType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export type CartItemType = {
  id: string;
  title: string;
  type: string;
  price: number;
  count: number;
  imageUrl: string;
  size: number;
};

export interface CartSliceInterface {
  totalPrice: number;
  items: CartItemType[];
}

export type PizzaBlockType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export interface PizzasSliceInterface {
  items: PizzaBlockType[];
  status: Status;
}
