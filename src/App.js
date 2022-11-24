import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

// import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
// import pizzas from './assets/pizzas.json';

// export const SearchContext = React.createContext('');

function App() {
  // const [searchValue, setSearchValue] = React.useState('');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
