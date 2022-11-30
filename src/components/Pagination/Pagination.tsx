import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationPropsType } from '../../redux/slices/types';
import style from './Pagination.module.scss';

const Pagination: React.FC<PaginationPropsType> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
