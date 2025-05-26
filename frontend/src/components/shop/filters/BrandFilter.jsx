import React from "react";
import AsyncSelect from "react-select/async";
import { NODE_API } from "../../../api/apiIndex";

const BrandFilter = ({ brand, setBrand }) => {
const loadBrands = async (searchQuery) => {
  try {
    const response = await fetch(`http://localhost:3001/brands?q=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) throw new Error("Failed to fetch brands");

    const data = await response.json();
    console.log("data for the brands:",data.map(brand => ({value:brand._id,label:brand.name})));
    return data.map(brand => ({
      label: brand.name,
      value: brand._id,

    }));
  } catch (error) {
    console.error("Error loading brands:", error);
    return [];
  }
};


  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="brands" className="text-textDim text-sm">
        Brand
      </label>
      <AsyncSelect
        cacheOptions
        loadOptions={loadBrands}
        defaultOptions
        name="brands"
        onChange={setBrand}
        value={brand}
        placeholder="Select Brands"
        isMulti
      />
    </div>
  );
};

export default BrandFilter;
