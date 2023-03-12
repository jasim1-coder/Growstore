import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestSellingProduct,
  getBestSellingProduct,
  getBestSellingProductError,
  getBestSellingProductStatus,
} from "../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const BestSellers = () => {
  const dispatch = useDispatch();
  const data = useSelector(getBestSellingProduct);
  const status = useSelector(getBestSellingProductStatus);
  const error = useSelector(getBestSellingProductError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchBestSellingProduct());
    }
  }, []);

  return (
    <div className="container main-container">
      <h2 className="heading2">Our Best Selling Products</h2>
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

export default BestSellers;
