import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands, getAllBrands } from "../../../redux/slice/brandSlice";

const BrandFilter = ({ brand, setBrand }) => {
  const dispatch = useDispatch();

  const data = useSelector(getAllBrands);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchAllBrands());
    }
  }, []);

  const handleBrand = (value) => {
    const check = brand.find((entry) => entry === value);

    if (check) {
      setBrand((brand) => brand.filter((entry) => entry !== value));
    } else {
      setBrand((brand) => [...brand, value]);
    }
  };

  const handleChecked = (value) => {
    const check = brand.find((entry) => entry === value);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-textDim">Brand</span>
      <div className="flex flex-col gap-3 max-h-[200px] overflow-auto">
        {data.map((entry, key) => (
          <label key={key} className="flex flex-row gap-2 items-center pr-12">
            <input
              type="checkbox"
              id={entry.title}
              name={entry.title}
              value={entry.title}
              checked={handleChecked(entry.title)}
              onChange={() => handleBrand(entry.title)}
              className="accent-baseGreen"
            />
            <span className="text-sm text-uiBlack">{entry.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
