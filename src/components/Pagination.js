import React from 'react';
import left_arrow from '../styles/icons/left_pagination_arrow.svg';
import right_arrow from '../styles/icons/right_pagination_arrow.svg';

function Pagination({ currentPage, pageSize, numberOfProducts, onPageChange }) {
  const totalPages = Math.ceil(numberOfProducts / pageSize);

  const generatePageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 && currentPage > 4) {
        pages.push('...');
      }

      if (i === currentPage || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pages.push(i);
      }

      if (i === totalPages && currentPage < totalPages - 3) {
        pages.push('...');
      }
    }
    return pages;
  };

  function handlePageChange(newPage) {
    if (newPage !== '...') {
      onPageChange(newPage);
    }
  };

  function handleRightArrow() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  function handleLeftArrow() {
    if (currentPage > 1 ) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex flex-row items-start justify-center gap-[1.5rem] text-[1.2rem] text-dark-navy">
      {currentPage > 1 && <button onClick={handleLeftArrow} className="w-[1.5rem] h-[1.5rem] flex flex-row items-center justify-center">
        <img className="relative rounded-sm w-[0.7rem] h-[1.38rem]" alt="" src={left_arrow} />
      </button>}
      <div className="self-stretch flex flex-row items-start justify-center gap-[1.5rem]">
        {generatePageNumbers().map((page, index) => (
          <button
          key={index}
          className={`self-stretch relative tracking-0.05em leading-[1.5rem] font-medium flex items-center ${
            page === currentPage ? 'text-[1.7rem] w-2.5' : `w-${page === '...' ? 0.81 : 0.56}`
          } shrink-0`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
        ))}
      </div>
      {currentPage < totalPages  && <button onClick={handleRightArrow} className="w-[1.5rem] h-[1.5rem] flex flex-row items-center justify-center transform rotate-180 transform-origin-0-0">
        <img className="transform scale-x-[-1] relative rounded-sm w-[0.7] h-[1.38]" alt="" src={right_arrow} />
      </button>}
    </div>
  );
}

export default Pagination;