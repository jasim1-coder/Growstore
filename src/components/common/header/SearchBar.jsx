import React, { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSearchQuery,
  setsearchQuery,
} from "../../../redux/slice/productSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const oldQuery = useSelector(getSearchQuery);
  const navigate = useNavigate();

  const [query, setQuery] = useState(oldQuery);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("search Clicked");
    // const { data } = await NODE_API.get(`/product/search?query=${query}`);
    // console.log(data.data);
    dispatch(setsearchQuery(query));
    navigate("/products");
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row flex-wrap">
      <div className="bg-greyLight p-3 rounded-tl-sm rounded-bl-sm">
        <div className="flex flex-row items-center gap-2 text-uiBlack  max-w-full overflow-clip">
          <span className="whitespace-nowrap text-[14px] font-medium">
            All Categories
          </span>
          <FiChevronDown />
          <div className="ml-3 w-[1px] bg-uiGrey h-[20px]" />
        </div>
      </div>
      <div className="bg-greyLight p-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-uiBlack text-[14px] focus:outline-none w-[300px]"
          placeholder="Search for products..."
        />
      </div>
      <button
        type="submit"
        className="bg-baseGreen text-white px-5 text-[24px] rounded-tr-sm rounded-br-sm"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
