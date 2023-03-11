import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedCategories,
  getFeaturedCategories,
  getFeaturedCategoriesStatus,
  getFeaturedCategoryError,
} from "../../redux/slice/categoriesSlice";
import CategoryCard from "../categories/CategoryCard";

const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const data = useSelector(getFeaturedCategories);
  const status = useSelector(getFeaturedCategoriesStatus);
  const error = useSelector(getFeaturedCategoryError);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFeaturedCategories());
    }
  }, []);
  return (
    <div className="container main-container">
      <h2 className="heading2">Explore Categories</h2>
      {status === "loading" ? <p>Loading...</p> : null}
      {status === "failed" ? <p>{error}</p> : null}
      {status === "success" ? (
        <div className="grid-list-5 w-full">
          {data.map((entry) => (
            <CategoryCard key={entry._id} data={entry} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FeaturedCategories;
