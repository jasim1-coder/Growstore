import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import AsyncSelect from "react-select/async";
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
import { useDebounce } from "./useDebounce";

const customStyles = {
  option: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  container: (provided) => ({
    ...provided,
    minWidth: "200px",
  }),
  control: (provided) => ({
    ...provided,
    padding: "0 4px",
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    boxShadow: "none",
    minHeight: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 0 0 6px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0",
  }),
  input: (provided) => ({
    ...provided,
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
  const brands = useSelector(getSearchBrand);
  const reduxCategory = useSelector(getSearchCategory);

  const [query, setQuery] = useState(oldQuery || "");
  const [selectedCategory, setSelectedCategory] = useState(reduxCategory || null);

  const debouncedQuery = useDebounce(query, 500);

  const handleSearch = (e) => {
    e.preventDefault();

    const selectedCatValue = selectedCategory?.value || null;
    const brandValues = brands?.map((entry) => entry.value).join(",") || null;

    const params = {
      query: debouncedQuery,
      order,
      price: priceRange.toString(),
      categories: selectedCatValue,
      brands: brandValues,
    };

    if (params.query || params.categories || params.brands) {
      dispatch(fetchFilteredProducts(params));
      navigate("/products");
    }
  };

  const loadCategories = async (inputValue = "") => {
    try {
      const response = await fetch(`http://localhost:3001/categories?q=${inputValue}`);
      const data = await response.json();

      return data.map((cat) => ({
        label: cat.name || cat.title,
        value: cat.name || cat.title,
      }));
    } catch (error) {
      console.error("Error loading categories:", error);
      return [];
    }
  };

  useEffect(() => {
    setSelectedCategory(reduxCategory || null);
  }, [reduxCategory]);

  useEffect(() => {
    setQuery(oldQuery || "");
  }, [oldQuery]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-row max-w-full sm:w-auto w-full sm:px-0 px-4 sm:h-[48px] h-[40px]"
    >
      <div className="bg-greyLight rounded-tl-sm rounded-bl-sm flex items-center">
        <AsyncSelect
          cacheOptions
          loadOptions={loadCategories}
          defaultOptions
          name="category"
          onChange={setSelectedCategory}
          value={selectedCategory}
          isClearable
          placeholder="Select Category"
          className="sm:text-sm text-xs sm:w-[200px] w-[130px]"
          styles={customStyles}
          noOptionsMessage={() => "No categories found"}
        />
        <div className="ml-1 w-[1px] bg-uiGrey sm:h-[24px] h-[14px]" />
      </div>
      <div className="bg-greyLight flex-1 flex items-center h-full">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-uiBlack sm:text-sm text-xs focus:outline-none sm:w-[250px] w-full pr-4 h-full pl-4"
          placeholder="Search for products, brands, or categories..."
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
