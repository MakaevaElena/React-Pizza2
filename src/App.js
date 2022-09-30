import React from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';
// import pizzas from './assets/pizzas.json';

function App() {
  // https://6336e2ec5327df4c43cb898a.mockapi.io/items

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://6336e2ec5327df4c43cb898a.mockapi.io/items')
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((arr) => {
        // console.log('массив пицц', arr);
        setItems(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;
