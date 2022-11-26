import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';

const FullPizza: React.FC = (props) => {
  const [pizza, setPizza] = React.useState<{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          `https://6336e2ec5327df4c43cb898a.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Error');
        navigate('/');
      }
    }
    fetchPizzaById();
  }, []);
  //   const item = useSelector(selectCartItemById(id));

  if (!pizza) {
    return <>'Loading...'</>;
  }

  return (
    <div>
      <PizzaBlock {...pizza} />
    </div>
  );
};

export default FullPizza;
