import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesPropsType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesPropsType> = ({ value, onChangeCategory }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // const onClickcategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
