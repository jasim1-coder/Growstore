import React, { useState } from "react";
import { PRIVATE_API } from "../../../api/apiIndex";
import { FaStar } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { FiSave, FiXCircle } from "react-icons/fi";
import DeleteReviewButton from "./DeleteReviewButton";

const UpdateReviewForm = ({ setOldReview, oldReview, setEditReview }) => {
  const [reviewText, setReviewText] = useState(oldReview.reviewText);
  const [rating, setRating] = useState(oldReview.Rating);

  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [updateStatus, setUpdateStatus] = useState("idle");

  const handleUpdateReview = async (e) => {
    e.preventDefault();

    var err = false;

    if (isNaN(rating) || rating <= 0) {
      setRatingError("Rating is requied");
      err = true;
    }

    if (!reviewText || !reviewText.trim()) {
      setReviewError("Review is required");
      err = true;
    }

    if (!err) {
      try {
        setUpdateStatus("loading");
        const data = { rating, reviewText };
        const res = await PRIVATE_API.put(`/review/${oldReview._id}`, data);
        setUpdateStatus("idle");

        setOldReview(res.data.data);
        setEditReview(false);
      } catch (error) {
        setUpdateStatus("failed");

        setTimeout(() => {
          setUpdateStatus("idle");
        }, 2000);
      }
    }
  };

  return (
    <form
      onSubmit={handleUpdateReview}
      className="border border-greyLight p-4 flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm text-textDim">Rating:</span>
        <div className="flex flex-row gap-2 items-center">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={(e) => {
                    setRating(parseInt(e.target.value));
                    setRatingError("");
                  }}
                  className="hidden"
                />
                <FaStar
                  className={`text-[24px] ${
                    ratingValue <= rating ? "text-[#FDC040]" : "text-[#D4D4D4]"
                  }`}
                />
              </label>
            );
          })}
          <span className="text-textDim text-sm pl-2">({rating} stars)</span>
        </div>
        {ratingError && <span className="input-error">{ratingError}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="review" className="text-sm text-textDim">
          Your review:
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            setReviewError("");
          }}
          rows={5}
          className="border border-uiGrey p-3 rounded-sm text-sm text-bodyText"
          placeholder="Enter your review"
        />
        {reviewError && <span className="input-error">{reviewError}</span>}
      </div>
      <div className="flex flex-row justify-between items-center">
        <DeleteReviewButton
          id={oldReview._id}
          setEditReview={setEditReview}
          setOldReview={setOldReview}
        />
        <div className="flex flex-row gap-5 items-center">
          <button
            type="button"
            onClick={() => setEditReview(false)}
            className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
          >
            <FiXCircle />
            <span className="text-sm">Cancel</span>
          </button>
          <button
            type="submit"
            className="text-uiWhite border-baseGreen bg-baseGreen border py-2 px-4 rounded-sm hover:bg-darkGreen transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
            disabled={updateStatus === "loading"}
          >
            {updateStatus == "loading" ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              <>
                <FiSave />
                <span className="text-sm">Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateReviewForm;
