import React from "react";
import AsyncSelect from "react-select/async";
import { NODE_API } from "../../../api/apiIndex";

const CategoryFilter = ({ categories, setCategories }) => {
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

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="category" className="text-textDim text-sm">
        Category
      </label>
      <AsyncSelect
        cacheOptions
        loadOptions={loadCategories}
        defaultOptions
        name="category"
        onChange={setCategories}
        value={categories}
        placeholder="Select Category"
      />
    </div>
  );
};

export default CategoryFilter;
