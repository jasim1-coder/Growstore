import React from "react";
import AsyncSelect from "react-select/async";
import { NODE_API } from "../../../api/apiIndex";

const BrandFilter = ({ brand, setBrand }) => {
  const loadBrands = async (searchQuery) => {
    try {
      const { data } = await NODE_API.get(
        `/brand/select-search?searchQuery=${searchQuery}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
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
