import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationPropsType = {
  currentPage: number;
  onChangePage: any;
};

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
