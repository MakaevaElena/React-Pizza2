import React from 'react';
// import axios from 'axios';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const items = useSelector((state) => state.pizzas.items);
  const status = useSelector((state) => state.pizzas.status);

  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const order = sort.includes('-') ? 'desc' : 'asc';
  const sortBy = sort.replace('-', '');
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
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage,
      }),
    );

    //запрос с сервера fetch
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

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))} />
        <Sort />
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
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
