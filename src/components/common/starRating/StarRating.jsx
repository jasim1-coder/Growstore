import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";

const MAX_STARS = 5;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-row gap-2">
      <div className="flex items-center gap-[1px]">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar className="text-[#FDC040]" key={i} />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-[#FDC040]" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar className="text-[#D4D4D4]" key={i} />
        ))}
      </div>
      <span className="text-textDim text-sm">({rating})</span>
    </div>
  );
};

export default StarRating;
