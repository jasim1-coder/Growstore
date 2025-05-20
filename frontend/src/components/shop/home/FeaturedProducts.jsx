import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getFeaturedProduct,
  getFeaturedProductError,
  getFeaturedProductStatus,
} from "../../../redux/slice/productSlice"; // Make sure the path is correct
import ProductCard from "../product/ProductCard"; // Adjust the path as needed

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  
  // Select the featured product state from the Redux store
  const data = useSelector(getFeaturedProduct);
  const status = useSelector(getFeaturedProductStatus);
  const error = useSelector(getFeaturedProductError);

  useEffect(() => {
    // Fetch products only if the status is idle (no ongoing fetch operation)
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]); // Dependencies: run when dispatch or status changes

  useEffect(() => {
    if (status === "succeeded") {
      console.log(data); // Log data when it's successfully fetched
    }
  }, [status, data]); // Run this when either status or data changes

  return (
    <div className="container main-container">
      <h2 className="heading2">Featured Products</h2>

      {/* Display loading message */}
      {status === "loading" && <p>Loading...</p>}

      {/* Display error if fetch failed */}
      {status === "failed" && <p>{error}</p>}

      {/* Display products if fetch was successful */}
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

export default FeaturedProducts;
