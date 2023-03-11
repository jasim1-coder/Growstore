import React from "react";
import Layout from "../components/common/Layout";
import BestSellers from "../components/home/BestSellers";
import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Foryou from "../components/home/Foryou";
import Hero from "../components/home/Hero";
import InfoSection from "../components/home/InfoSection";
import Popular from "../components/home/Popular";
import Related from "../components/home/Related";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Foryou />
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
