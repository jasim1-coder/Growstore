import React from "react";

const ProductAnalysis = () => {
  return (
    <div className="flex flex-col mb-6">
      <div className="pb-3 border-b border-b-greyLight">
        <h4 className="heading4">Product Sales History</h4>
      </div>
      <div className="p-3 grid-list-2">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Orders</span>
          <span className="">ABC</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Amount Spent</span>
          <span className="">Abc</span>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;
