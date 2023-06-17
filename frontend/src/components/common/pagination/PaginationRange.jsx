import { useMemo, useState } from "react";

const DOTS = "...";

const PaginationRange = ({
  totalPages,
  handlePageChange,
  currentPage,
  sibling = 1,
}) => {
  const [range, setRange] = useState([]);

  const getRange = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  useMemo(() => {
    const totalPageNumbers = sibling + 5;
    if (totalPageNumbers >= totalPages) {
      setRange(getRange(1, totalPages));
    }

    const leftSiblingIndex = Math.max(currentPage - sibling, 1);
    const rightSiblingIndex = Math.min(currentPage + sibling, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * sibling;
      let leftRange = getRange(1, leftItemCount);

      setRange([...leftRange, DOTS, totalPages]);
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * sibling;
      let rightRange = getRange(totalPages - rightItemCount + 1, totalPages);
      setRange([firstPageIndex, DOTS, ...rightRange]);
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
      setRange([firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]);
    }
  }, [sibling, totalPages, currentPage]);

  return (
    <div className="flex flex-row gap-1">
      {range.map((val, index) => (
        <button
          onClick={() => handlePageChange(val)}
          className={`h-[2em] w-[2em] rounded-sm ${
            currentPage === val
              ? "bg-baseGreen text-white border border-buttonPrimary font-medium"
              : "bg-transparent hover:bg-lightGreen duration-150 transition-all hover:ease-linear border-textSecondary/60 border"
          } text-textPrimary text-[16px]`}
          key={index}
          disabled={val === DOTS}
        >
          {val}
        </button>
      ))}
    </div>
  );
};

export default PaginationRange;
