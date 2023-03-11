import React from "react";
import ProductCard from "../product/ProductCard";

const Foryou = () => {
  return (
    <div className="container main-container sm:pt-16 pt-12">
      <h2 className="heading2">Our Top Picks for You</h2>
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

export default Foryou;
