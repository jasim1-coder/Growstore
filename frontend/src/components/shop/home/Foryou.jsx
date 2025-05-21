import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopPicks, // Updated the action name to reflect that we are fetching top picks now
  getTopPicks, // Updated selector for top picks
  getTopPicksError, // Updated error selector
  getTopPicksStatus, // Updated status selector
} from "../../../redux/slice/productSlice"; // Ensure that your slice has the updated action and selectors
import ProductCard from "../product/ProductCard";

const Foryou = () => { // Removed userId as it is not needed anymore
  const dispatch = useDispatch();
  const data = useSelector(getTopPicks); // Selector for top picks
  const status = useSelector(getTopPicksStatus); // Status for top picks
  const error = useSelector(getTopPicksError); // Error for top picks

  // Fetch top picks when component mounts if data is empty
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchTopPicks()); // Dispatch updated action to fetch top picks
    }
  }, [dispatch, data.length]);

  return (
    <div className="container main-container sm:pt-16 pt-12">
      <h2 className="heading2">Our Top Picks for You</h2>

      {/* Loading state */}
      {status === "loading" ? <p>Loading...</p> : null}

      {/* Error state */}
      {status === "failed" ? <p>{error}</p> : null}

      {/* Display top picks if fetch succeeded */}
      {status === "succeeded" && data.length > 0 ? (
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
