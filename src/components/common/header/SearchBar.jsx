import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFilteredProducts,
  getSearchBrand,
  getSearchCategory,
  getSearchOrder,
  getSearchPrice,
  getSearchQuery,
} from "../../../redux/slice/productSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldQuery = useSelector(getSearchQuery);
  const order = useSelector(getSearchOrder);
  const priceRange = useSelector(getSearchPrice);
  const categories = useSelector(getSearchCategory);
  const brands = useSelector(getSearchBrand);

  const [query, setQuery] = useState(oldQuery);

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = {
      query,
      order,
      price: priceRange.toString(),
      categories: categories.toString(),
      brands: brands.toString(),
    };
    dispatch(fetchFilteredProducts(params));
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-row max-w-full sm:w-auto w-full sm:px-0 px-4"
    >
      <div className="bg-greyLight sm:p-3 p-2 flex-1">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-uiBlack text-[14px] focus:outline-none sm:w-[300px] w-full"
          placeholder="Search for products..."
        />
      </div>
      <button
        type="submit"
        className="bg-baseGreen text-white px-5 sm:text-[24px] text-[20px] rounded-tr-sm rounded-br-sm"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
