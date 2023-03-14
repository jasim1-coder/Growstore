import React from "react";
import PaginationRange from "./PaginationRange";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  // const handleLimitChange = (page, limit) => {
  //   getData(page, limit);
  // };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handlePrevious = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  const from = (page - 1) * limit + 1;
  const to =
    (page - 1) * limit + limit > total ? total : (page - 1) * limit + limit;

  return (
    <div className="flex sm:flex-row flex-col justify-between items-center sm:gap-6 gap-3 border border-textSecondary py-2 sm:px-4">
      <div className="flex flex-row gap-2">
        {/* Current table entries info */}
        <span className="text-textDim text-sm">
          Showing entries {from} - {to}&nbsp;of {total}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto sm:w-max w-full">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          className="disabled:text-textSecondary/50 disabled:hover:bg-transparent text-textSecondary bg-transparent hover:bg-gray-300 duration-150 transition-all hover:ease-linear h-[2em] w-[2em] rounded-full p-2"
          disabled={page > 1 ? false : true}
        >
          <FaAngleLeft />
        </button>
        {/* Navigation based on page number */}
        <PaginationRange
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={page}
        />
        {/* Next button */}
        <button
          onClick={handleNext}
          className="disabled:text-textSecondary/50 disabled:hover:bg-transparent text-textSecondary bg-transparent hover:bg-gray-300 duration-150 transition-all hover:ease-linear h-[2em] w-[2em] rounded-full p-2"
          disabled={page < totalPages ? false : true}
        >
          <FaAngleRight />
        </button>
      </div>
      {/* <div>
        Number of entries for the table
        <select
          value={limit}
          onChange={(e) => handleLimitChange(page, e.target.value)}
          className="py-1 px-2 border border-textSecondary/60 focus:outline-none"
        >
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="30">30 / page</option>
        </select>
      </div> */}
    </div>
  );
};

export default Pagination;
