import React from "react";
import ProductCard from "../product/ProductCard";

const BestSellers = () => {
  return (
    <div className="container main-container">
      <h2 className="heading2">Our Best Selling Products</h2>
      <div className="grid-list-4 w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default BestSellers;
