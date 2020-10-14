import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // if number of pages is 1 don't return anything
  if (pagesCount === 1) return null;
  // generate list from 1 to n page
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <span onClick={() => onPageChange(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// to assert type date passed in compoonent
Pagination.propType = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
