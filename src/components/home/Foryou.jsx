import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserID } from "../../redux/slice/authSlice";
import {
  fetchRecommendation,
  getRecommendations,
  getRecommendationsError,
  getRecommendationsStatus,
} from "../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const Foryou = ({ userId }) => {
  const dispatch = useDispatch();
  const data = useSelector(getRecommendations);
  const status = useSelector(getRecommendationsStatus);
  const error = useSelector(getRecommendationsError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchRecommendation(userId));
    }
  }, []);

  return (
    <div className="container main-container sm:pt-16 pt-12">
      <h2 className="heading2">Our Top Picks for You</h2>
      {status === "loading" ? <p>Loading...</p> : null}
      {status === "failed" ? <p>{error}</p> : null}
      {status === "success" ? (
        <div className="grid-list-4 w-full">
          {data.map((entry) => (
            <ProductCard key={entry._id} data={entry} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Foryou;
