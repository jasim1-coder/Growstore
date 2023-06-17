import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import AsyncSelect from "react-select/async";
import { NODE_API } from "../../../api/apiIndex";

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

const customStyles = {
  option: (defaultStyles) => ({
    ...defaultStyles,
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
    height: "100%",
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    padding: "0 4px",
    backgroundColor: "tansparent",
    border: "none",
    boxShadow: "none",
    minHeight: "0",
    height: "100%",
    // padding: "10px",
    // border: "none",
    // boxShadow: "none",
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    //  color: "#fff"
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: "0 0 0 6px",
    // height: "100%",
  }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    display: "none",
    margin: "0",
  }),
  indicatorsContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: 0,
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    padding: 0,
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    padding: "0",
    margin: "0",
  }),
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldQuery = useSelector(getSearchQuery);
  const order = useSelector(getSearchOrder);
  const priceRange = useSelector(getSearchPrice);
  const _categories = useSelector(getSearchCategory);
  const brands = useSelector(getSearchBrand);

  const [query, setQuery] = useState(oldQuery);
  const [categories, setCategories] = useState(_categories);

  const handleSearch = async (e) => {
    e.preventDefault();
    const __categories = categories?.value;
    const _brands = brands.map((entry) => entry.value);
    const params = {
      query,
      order,
      price: priceRange.toString(),
      categories: __categories,
      brands: _brands.toString(),
    };
    dispatch(fetchFilteredProducts(params));
    navigate("/products");
  };

  const loadCategories = async (searchQuery) => {
    try {
      const { data } = await NODE_API.get(
        `/category/select-search?searchQuery=${searchQuery}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    setCategories(_categories);
  }, [_categories]);

  useEffect(() => {
    setQuery(oldQuery);
  }, [oldQuery]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-row max-w-full sm:w-auto w-full sm:px-0 px-4 sm:h-[48px] h-[40px]"
    >
      <div className="bg-greyLight rounded-tl-sm rounded-bl-sm flex items-center">
        <div className="flex flex-row items-center sm:gap-2 gap-1 text-uiBlack max-w-full h-full">
          <AsyncSelect
            cacheOptions
            loadOptions={loadCategories}
            defaultOptions
            name="category"
            onChange={setCategories}
            value={categories}
            isClearable
            placeholder="Select Category"
            className="sm:text-sm text-xs sm:w-[200px] w-[130px]"
            styles={customStyles}
            noOptionsMessage={() => "No categories found"}
          />
          <div className="ml-1 w-[1px] bg-uiGrey sm:h-[24px] h-[14px]" />
        </div>
      </div>
      <div className="bg-greyLight flex-1 flex items-center h-full">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-uiBlack sm:text-sm text-xs focus:outline-none sm:w-[250px] w-full pr-4 h-full pl-4"
          placeholder="Search for products..."
        />
      </div>
      <button
        type="submit"
        className="bg-baseGreen text-white sm:px-5 px-2 sm:text-[24px] text-[12px] rounded-tr-sm rounded-br-sm"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
