import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopPicks,
  getTopPicks,
  getTopPicksError,
  getTopPicksId,
  getTopPicksStatus,
  setTopPicksId,
} from "../../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const Related = () => {
  const dispatch = useDispatch();
  const data = useSelector(getTopPicks);
  const topPicksId = useSelector(getTopPicksId);
  const status = useSelector(getTopPicksStatus);
  const error = useSelector(getTopPicksError);

  useEffect(() => {
    const newTopPicksId = JSON.parse(localStorage.getItem("product"));
    if (newTopPicksId !== topPicksId) {
      dispatch(fetchTopPicks(newTopPicksId));
      dispatch(setTopPicksId(newTopPicksId));
    }
  }, []);

  return (
    <div className="container main-container">
      <h2 className="heading2">Top picks for your choices</h2>
      {topPicksId ? (
        <>
          {status === "loading" ? <p>Loading...</p> : null}
          {status === "failed" ? <p>{error}</p> : null}
          {status === "succeeded" ? (
            <div className="grid-list-4 w-full">
              {data.map((entry) => (
                <ProductCard key={entry._id} data={entry} />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <p>Please browse some products</p>
      )}
    </div>
  );
};

export default Related;
