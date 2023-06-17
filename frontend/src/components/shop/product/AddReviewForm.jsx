import React, { useState } from "react";
import { PRIVATE_API } from "../../../api/apiIndex";
import { FaStar } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const AddReviewForm = ({ id, setOldReview }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [addStatus, setAddStatus] = useState("idle");

  const handleAddReview = async (e) => {
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
        setAddStatus("loading");
        const data = { id, rating, reviewText };
        const res = await PRIVATE_API.post("/review/add", data);

        setOldReview(res.data.data);

        setRating(0);
        setReviewText("");
        setAddStatus("idle");
      } catch (error) {
        setAddStatus("failed");

        setTimeout(() => {
          setAddStatus("idle");
        }, 2000);
      }
    }
  };

  return (
    <form onSubmit={handleAddReview} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="">Rating:</span>
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
        <label htmlFor="review">Your review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            setReviewError("");
          }}
          rows={5}
          className="border border-uiGrey p-3 rounded-sm"
          placeholder="Enter your review"
        />
        {reviewError && <span className="input-error">{reviewError}</span>}
      </div>
      <div className="">
        <button
          type="submit"
          className="primary-button w-[150px]"
          disabled={addStatus !== "idle"}
        >
          {addStatus == "loading" ? (
            <ImSpinner2 className="animate-spin" />
          ) : addStatus === "failed" ? (
            "Error"
          ) : (
            "Add Review"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
