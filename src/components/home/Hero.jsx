import React from "react";
import { Link } from "react-router-dom";
import { herobg, heroImage } from "../../assets";

const Hero = () => {
  return (
    <div
      className="sm:h-[450px] h-[300px]"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row justify-between h-full">
        <div className="sm:basis-6/12 self-center sm:ml-16 ml-4">
          <h1 className="sm:text-[48px] leading-tight text-[28px] text-uiBlack font-bold">
            Elevate Your Meals with Our Fresh and Flavorful Groceries
          </h1>
          <p className="text-textDim sm:text-base text-sm">
            Our commitment to quality means you'll always find the freshest and
            <br />
            most flavorful groceries in our store.
          </p>
          <Link to="/shop">
            <button className="primary-button mt-4">
              Explore our products
            </button>
          </Link>
        </div>
        <div className="sm:block hidden">
          <img src={heroImage} className="max-h-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
