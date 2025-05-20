import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeaturedCategories,
  getFeaturedCategories,
  getFeaturedCategoriesStatus,
  getFeaturedCategoryError,
} from "../../../redux/slice/categoriesSlice"; // Ensure the path is correct
import CategoryCard from "../categories/CategoryCard"; // Ensure the path is correct

const FeaturedCategories = () => {
  const dispatch = useDispatch();

  // Selectors to fetch data, status, and error
  const data = useSelector(getFeaturedCategories);
  const status = useSelector(getFeaturedCategoriesStatus);
  const error = useSelector(getFeaturedCategoryError);

  // Fetch data when component mounts if data is empty
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFeaturedCategories()); // Fetch categories only if the status is idle
    }
  }, [dispatch, status]); // Run the effect once when the component mounts

  return (
    <div className="container main-container">
      <h2 className="heading2">Explore Categories</h2>

      {/* Display loading state */}
      {status === "loading" && <p>Loading...</p>}

      {/* Display error if fetch failed */}
      {status === "failed" && <p>{error}</p>}

      {/* Display categories if fetch was successful */}
      {status === "success" && (
        <div className="grid-list-5 w-full">
          {data.map((entry) => (
            <CategoryCard key={entry._id} data={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;
