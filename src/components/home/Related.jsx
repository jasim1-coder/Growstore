import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopPicks,
  getTopPicks,
  getTopPicksError,
  getTopPicksStatus,
} from "../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const Related = () => {
  const dispatch = useDispatch();
  const data = useSelector(getTopPicks);
  const status = useSelector(getTopPicksStatus);
  const error = useSelector(getTopPicksError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchTopPicks("B001ONXSBA"));
    }
  }, []);

  return (
    <div className="container main-container">
      <h2 className="heading2">Top picks for your choices</h2>
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

export default Related;
