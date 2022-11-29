import React from 'react';
// import axios from 'axios';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
// import { SearchContext } from '../App';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC =  () => {
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const { sortProperty } = useSelector((state) => state.filter.sort);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  // const { sortProperty } = useSelector(selectSort);
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);

  // const items = useSelector((state) => state.pizzas.items);
  // const status = useSelector((state) => state.pizzas.status);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  // const { searchValue } = React.useContext(SearchContext);

  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
  const sortBy = sort.sortProperty.replace('-', '');
  const search = searchValue ? searchValue : '';

  const getPizzas = async () => {
    // замена запроса fetch на axios
    // await axios
    //   .get(
    //     `https://6336e2ec5327df4c43cb898a.mockapi.io/items?page=${currentPage}&search=${search}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err)=>{
    //     setIsLoading(false);
    //   })

    //замена .then на async/await

    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage,
      }),
    );

    // fetch(
    //   `https://6336e2ec5327df4c43cb898a.mockapi.io/items?page=${currentPage}&search=${search}&limit=4&${category}&sortBy=${sort}&order=${order}`,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortBy, searchValue, currentPage, category, order, search, sort]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={React.useCallback((i: number) => dispatch(setCategoryId(i)), [])}
        />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content_error-info">
          <h2>ошибка сервера</h2>
        </div>
      ) : (
        <div className="content__items">
          {
            status === 'loading' ? skeletons : pizzas
            // title={obj.title}
            // price={obj.price}
            // imageUrl={obj.imageUrl}
            // sizes={obj.sizes}
            // types={obj.types}
          }
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(page: number) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
