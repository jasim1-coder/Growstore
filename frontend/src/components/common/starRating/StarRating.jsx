import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";

const MAX_STARS = 5;

const StarRating = ({ rating = 0 }) => {
  const safeRating = Number(rating);
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex items-center gap-[1px]">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar className="text-[#FDC040]" key={i} />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-[#FDC040]" key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar className="text-[#D4D4D4]" key={i + MAX_STARS} />
        ))}
      </div>
      <span className="text-textDim text-sm">({safeRating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
