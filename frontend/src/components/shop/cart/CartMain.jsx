import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/slice/authSlice";
import {
  fetchCartItems,
  getCartItemsLength,
} from "../../../redux/slice/cartSlice";
import CheckoutCard from "./CheckoutCard";
import ProductList from "./ProductList";

const CartMain = ({ handleCheckout }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const itemsLength = useSelector(getCartItemsLength);
  console.log("cart length:",itemsLength)
  console.log("user:",user)

  useEffect(() => {
    if (user && itemsLength === 0) {
      dispatch(fetchCartItems(user.id));
    }
  }, []);

  return (
    <div className="sm:container py-[2rem] sm:px-[4rem]">
      <div className="flex md:flex-row flex-col justify-between gap-16">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-textDim py-4">
            <h2 className="heading2">Your Cart</h2>
            <span className="text-textDim">({itemsLength})</span>
          </div>
          <ProductList />
          <div className="py-4 flex flex-col gap-4">
            <p className="text-uiBlack">Need to add more items to your cart?</p>
            <div>
              <Link
                to="/products"
                className="text-sm border border-uiBlack py-2 px-5 font-medium hover:bg-greyLight transition-all duration-150 rounded-sm"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
        <CheckoutCard
          handleCheckout={handleCheckout}
          buttonName="Proceed To Checkout"
          buttonDisabled={itemsLength === 0}
        />
      </div>
    </div>
  );
};

export default CartMain;
