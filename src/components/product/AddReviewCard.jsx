import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PRIVATE_API } from "../../api/apiIndex";
import { getUser } from "../../redux/slice/authSlice";
import ReviewCard from "./ReviewCard";

const AddReviewCard = () => {
  const id = useParams().id;
  const user = useSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [oldReview, setOldReview] = useState("");
  const [error, setError] = useState("");

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

        console.log(res.data);

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

  const handleLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  const checkReview = async () => {
    try {
      const { data } = await PRIVATE_API.get(`/review/check/${id}`);

      const hasAlreadyAdded = data.found;

      if (hasAlreadyAdded) {
        data.data.reviewerName = user.name;
        setOldReview(data.data);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error);
    }
  };

  useEffect(() => {
    if (user) {
      checkReview();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-3 border border-greyLight p-4 rounded-sm">
      <h4 className="font-medium text-[20px]">Add a review</h4>
      {!user ? (
        <div className="flex gap-2 items-center">
          <span className="text-bodyText">Please</span>
          <button
            onClick={handleLogin}
            className="px-6 py-1 hover:bg-baseGreen text-baseGreen border border-baseGreen hover:text-uiWhite transition-all duration-100 rounded-sm font-medium"
          >
            Login
          </button>
          <span className="text-bodyText">to add a review</span>
        </div>
      ) : oldReview ? (
        <div className="">
          <ReviewCard data={oldReview} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
                        ratingValue <= rating
                          ? "text-[#FDC040]"
                          : "text-[#D4D4D4]"
                      }`}
                    />
                  </label>
                );
              })}
              <span className="text-textDim text-sm pl-2">
                ({rating} stars)
              </span>
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
      )}
    </div>
  );
};

export default AddReviewCard;
