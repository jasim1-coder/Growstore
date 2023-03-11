import React from "react";
import ProductCard from "../product/ProductCard";

const Popular = () => {
  return (
    <div className="container main-container mb-8">
      <h2 className="heading2">Popular Products</h2>
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

export default Popular;
