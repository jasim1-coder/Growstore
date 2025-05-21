import React from "react";
import AsyncSelect from "react-select/async";

const CategoryFilter = ({ categories, setCategories }) => {
  // Fetch and filter from db.json
  const fetchProductsByQuery = async (searchQuery) => {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();

      // Get unique matching categories
      const matchingCategories = data.products
        .filter(product =>
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(product => product.category);

      const uniqueCategories = [...new Set(matchingCategories)];

      // Format for react-select
      return uniqueCategories.map(cat => ({
        label: cat,
        value: cat
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
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
        loadOptions={fetchProductsByQuery}
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
