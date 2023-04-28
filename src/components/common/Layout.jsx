import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/authSlice";
import {
  fetchCartItemsNOUSER,
  getCartItems,
} from "../../redux/slice/cartSlice";
import ScrollToTop from "../../utils/ScrollToTop";
import Footer from "./footer";
import Header from "./header";
import ChatBot from "./chat/ChatBot";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cartItems = useSelector(getCartItems);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));

    if (cartItems.length === 0 && localCart && localCart.length > 0) {
      dispatch(fetchCartItemsNOUSER({ cartItems: localCart }));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      const _data = cartItems.map((entry) => ({
        id: entry.id,
        quantity: entry.quantity,
      }));

      localStorage.setItem("cart", JSON.stringify(_data));
    }
  }, [cartItems]);

  return (
    <div className="min-h-[100vh] flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
