import React from "react";
import { Link } from "react-router-dom";
import { product } from "../../assets";
import StarRating from "../common/starRating/StarRating";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductCard = () => {
  const handleAddtoCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="group m-auto min-h-[300px] max-w-[300px] outline outline-1 outline-greyLight rounded-sm">
      <div className="h-full w-full overflow-hidden relative">
        <Link to="/product">
          <img
            className="object-contain h-full w-full group-hover:scale-125 transition-all duration-500"
            src={product}
            alt=""
          />
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-2 relative">
        <div className="z-10 h-[44px] w-[44px] absolute -top-5 right-6 bg-white rounded-full border border-uiGrey">
          <button className="flex items-center justify-center h-full w-full text-[20px]">
            <AiOutlineHeart />
          </button>
        </div>
        <Link to="/product">
          <p className="text-textDim text-sm">Vegetables</p>
          <p className="text-uiBlack text-[18px] font-medium">Redish 500g</p>
        </Link>
        <div>
          <StarRating rating="3.8" />
          <p>
            <span className="text-textDim">By</span>&nbsp;
            <Link to="/brand" className="text-baseGreen">
              Amazon
            </Link>
          </p>
        </div>
        <div className="flex flex-row justify-between items-center gap-3">
          <p className="flex-none">
            <Link to="/product">
              <span className="text-baseGreen text-[22px] font-semibold">
                &#8377; 100
              </span>
              &nbsp;
              <span className="text-textDim line-through">&#8377; 500</span>
            </Link>
          </p>
          <button
            type="button"
            onClick={handleAddtoCart}
            className="flex flex-row gap-2 py-3 w-[100px] rounded-sm text-baseGreen bg-lightGreen items-center justify-center hover:bg-baseGreen hover:text-uiWhite transition-all duration-150"
          >
            <FiShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
