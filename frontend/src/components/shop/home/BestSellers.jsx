import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestSellingProduct,
  getBestSellingProduct,
  getBestSellingProductError,
  getBestSellingProductStatus,
} from "../../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const BestSellers = () => {
  const dispatch = useDispatch();
  const data = useSelector(getBestSellingProduct);
  const status = useSelector(getBestSellingProductStatus);
  const error = useSelector(getBestSellingProductError);

  useEffect(() => {
    // Dispatch action to fetch best-selling products if not already loaded
    if (data.length === 0 && status === "idle") {
      dispatch(fetchBestSellingProduct());
    }
  }, [dispatch, data.length, status]);

  return (
    <div className="container main-container">
      <h2 className="heading2">Our Best Selling Products</h2>
      
      {/* Display loading message if the request is in progress */}
      {status === "loading" && <p>Loading...</p>}
      
      {/* Display error message if the request failed */}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}
      
      {/* Display products if data is successfully fetched */}
      {status === "succeeded" && (
        <div className="grid-list-4 w-full">
          {data.map((entry) => (
            <ProductCard key={entry._id} data={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
