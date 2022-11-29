import React from 'react';
// import { useWhyDidYouUpdate } from 'ahooks';
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesPropsType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesPropsType> = React.memo(({ value, onChangeCategory }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // const onClickcategory = (index) => {
  //   setActiveIndex(index);
  // };

  //https://ahooks.js.org/hooks/use-request/index
  //useWhyDidYouUpdate следит за изменением пропсов
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory });
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
});

export default Categories;
