import React from 'react';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  // https://6336e2ec5327df4c43cb898a.mockapi.io/items

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://6336e2ec5327df4c43cb898a.mockapi.io/items')
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((arr) => {
        // console.log('массив пицц', arr);
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                // title={obj.title}
                // price={obj.price}
                // imageUrl={obj.imageUrl}
                // sizes={obj.sizes}
                // types={obj.types}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
