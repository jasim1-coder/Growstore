import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import ProductList from "../../components/shop/wishlist/ProductList";
import {
  fetchWishlist,
  getWishlistItemsLength,
} from "../../redux/slice/wishlistSlice";
import { getUser } from "../../redux/slice/authSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const length = useSelector(getWishlistItemsLength);
  console.log("wishlist length:",length);
  const userId = user.id;
  console.log("user id for wishlist :",userId);

  useEffect(() => {
    if (length === 0) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId]);

  return (
    <Layout>
      <div className="container py-[2rem] sm:px-[4rem]">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-textDim py-4">
            <h2 className="heading2">Your Wishlist</h2>
            <span className="text-textDim">({length})</span>
          </div>
          <ProductList />
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
