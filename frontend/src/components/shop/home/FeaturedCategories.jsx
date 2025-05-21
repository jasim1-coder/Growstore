import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  getAllCategories, // <-- You need to add this selector if it doesn’t exist
  getAllCategoriesStatus,
  getAllCategoriesError,
} from "../../../redux/slice/categoriesSlice";
import CategoryCard from "../categories/CategoryCard";

const FeaturedCategories = () => {
  const dispatch = useDispatch();

  const data = useSelector(getAllCategories)?.slice(0, 5); // Take first 5
  const status = useSelector(getAllCategoriesStatus);
  const error = useSelector(getAllCategoriesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="container main-container">
      <h2 className="heading2">Explore Categories</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}

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
