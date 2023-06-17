import moment from "moment/moment";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import StarRating from "../../common/starRating/StarRating";
import UpdateReviewForm from "./UpdateReviewForm";
import { FiEdit } from "react-icons/fi";

const UserReviewCard = ({ data, setOldReview }) => {
  const [editReview, setEditReview] = useState(false);

  const date = moment(data.Time).format("MMMM DD, YYYY");
  return editReview ? (
    <UpdateReviewForm
      oldReview={data}
      setOldReview={setOldReview}
      setEditReview={setEditReview}
    />
  ) : (
    <div className="border border-greyLight p-4 flex flex-col">
      <div className="flex flex-row justify-between items-center border-b border-b-greyLight pb-4">
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-row gap-3">
            <FaRegUserCircle className="text-[22px] text-textDim" />
            <span className="font-medium text-uiBlack">
              {data.reviewerName}
            </span>
          </div>
          <span className="text-sm text-textDim">{date}</span>
        </div>
        <div className="">
          <button
            type="button"
            onClick={() => setEditReview(true)}
            className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
          >
            <FiEdit />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-4">
        <StarRating rating={data.Rating} />
        <p className="text-bodyText text-sm">{data.reviewText}</p>
      </div>
    </div>
  );
};

export default UserReviewCard;
