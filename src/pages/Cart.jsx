import React from "react";

import Layout from "../components/common/Layout";
import CartMain from "../components/cart/CartMain";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <Layout>
      <CartMain handleCheckout={handleCheckout} />
    </Layout>
  );
};

export default Cart;
