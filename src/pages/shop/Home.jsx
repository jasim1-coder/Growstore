import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import BestSellers from "../../components/shop/home/BestSellers";
import FeaturedCategories from "../../components/shop/home/FeaturedCategories";
import FeaturedProducts from "../../components/shop/home/FeaturedProducts";
import Foryou from "../../components/shop/home/Foryou";
import Hero from "../../components/shop/home/Hero";
import InfoSection from "../../components/shop/home/InfoSection";
import Popular from "../../components/shop/home/Popular";
import Related from "../../components/shop/home/Related";
import { getUser } from "../../redux/slice/authSlice";

const Home = () => {
  const user = useSelector(getUser);

  return (
    <Layout>
      <Hero />
      {user ? <Foryou userId={user.id} /> : null}
      <FeaturedCategories />
      <FeaturedProducts />
      <InfoSection />
      <Related />
      <BestSellers />
      <Popular />
    </Layout>
  );
};

export default Home;
