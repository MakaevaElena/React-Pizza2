import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

// import Header from './components/Header';
import Home from './pages/Home';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import React from 'react';
// import pizzas from './assets/pizzas.json';
// export const SearchContext = React.createContext('');

// https://github.com/jamiebuilds/react-loadable - подходит для SSR(server-side-rendering)
const Cart = Loadable({
  loader: () => import(/*webpackChunkName:"Cart"*/ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});

//https://ru.reactjs.org/docs/code-splitting.html
// const Cart = React.lazy(() => import(/*webpackChunkName:"Cart"*/ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName:"FullPizza"*/ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound"*/ './pages/NotFound'));

function App() {
  // const [searchValue, setSearchValue] = React.useState('');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:pizzaId"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
