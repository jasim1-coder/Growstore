import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  getAllCategories,
} from "../../redux/slice/categoriesSlice";

// const data = [
//   {
//     title: "Veggies",
//   },
//   {
//     title: "Veggies1",
//   },
//   {
//     title: "Veggies2",
//   },
//   {
//     title: "Veggies3",
//   },
// ];
const CategoryFilter = ({ categories, setCategories }) => {
  const dispatch = useDispatch();

  const data = useSelector(getAllCategories);

  const handleCategories = (value) => {
    const check = categories.find((entry) => entry === value);

    if (check) {
      setCategories((categories) =>
        categories.filter((entry) => entry !== value)
      );
    } else {
      setCategories((categories) => [...categories, value]);
    }
  };

  const handleChecked = (value) => {
    const check = categories.find((entry) => entry === value);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchAllCategories());
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-textDim">Category</span>
      <div className="flex flex-col gap-3 max-h-[200px] overflow-auto">
        {data.map((entry, key) => (
          <label key={key} className="flex flex-row gap-2 items-center pr-12">
            <input
              type="checkbox"
              id={entry.title}
              name={entry.title}
              value={entry.title}
              checked={handleChecked(entry.title)}
              onChange={() => handleCategories(entry.title)}
              className="accent-baseGreen"
            />
            <span className="text-sm text-uiBlack">{entry.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
