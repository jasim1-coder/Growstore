import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedProduct,
  getFeaturedProduct,
  getFeaturedProductError,
  getFeaturedProductStatus,
} from "../../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector(getFeaturedProduct);
  const status = useSelector(getFeaturedProductStatus);
  const error = useSelector(getFeaturedProductError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFeaturedProduct());
    }
  }, []);

  return (
    <div className="container main-container">
      <h2 className="heading2">Featured Products</h2>
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

export default FeaturedProducts;
