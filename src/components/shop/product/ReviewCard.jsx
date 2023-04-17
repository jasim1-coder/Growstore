import moment from "moment/moment";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import StarRating from "../../common/starRating/StarRating";

const ReviewCard = ({ data }) => {
  const date = moment(data.Time).format("MMMM DD, YYYY");
  return (
    <div className="border border-greyLight p-4 flex flex-col">
      <div className="flex flex-row gap-5 items-center border-b border-b-greyLight pb-4">
        <div className="flex flex-row gap-3">
          <FaRegUserCircle className="text-[22px] text-textDim" />
          <span className="font-medium text-uiBlack">{data.reviewerName}</span>
        </div>
        <span className="text-sm text-textDim">{date}</span>
      </div>
      <div className="pt-4 flex flex-col gap-4">
        <StarRating rating={data.Rating} />
        <p className="text-bodyText text-sm">{data.reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
