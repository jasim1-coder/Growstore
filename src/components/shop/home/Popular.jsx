import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopular,
  getPopularProducts,
  getPopularProductsError,
  getPopularProductsStatus,
} from "../../../redux/slice/productSlice";
import ProductCard from "../product/ProductCard";

const Popular = () => {
  const dispatch = useDispatch();
  const data = useSelector(getPopularProducts);
  const status = useSelector(getPopularProductsStatus);
  const error = useSelector(getPopularProductsError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchPopular());
    }
  }, []);

  return (
    <div className="container main-container mb-8">
      <h2 className="heading2">Popular Products</h2>
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

export default Popular;
