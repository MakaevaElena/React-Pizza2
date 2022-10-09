import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePge={currentPage}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
