import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PRIVATE_API } from "../../../api/apiIndex";
import { getUser } from "../../../redux/slice/authSlice";
import AddReviewForm from "./AddReviewForm";
import UserReviewCard from "./UserReviewCard";

const AddReviewCard = () => {
  const id = useParams().id;
  const user = useSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [oldReview, setOldReview] = useState("");
  const [error, setError] = useState("");

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
      <h4 className="font-medium text-[20px]">Your Review:</h4>
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
          <UserReviewCard data={oldReview} setOldReview={setOldReview} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <AddReviewForm id={id} setOldReview={setOldReview} />
      )}
    </div>
  );
};

export default AddReviewCard;
