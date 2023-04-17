import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { herobg, offer1, offer2, pattern } from "../../../assets";

const InfoSection = () => {
  return (
    <div className="container flex md:flex-row flex-col gap-8 ">
      <div
        className="md:w-[50%] w-full h-[300px]"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="h-full flex flex-row items-end justify-between bg-[#FFF5E1]/60">
          <div className="flex flex-col h-full sm:pl-[40px] sm:py-[32px] p-3">
            <div className="flex flex-col gap-4">
              <div className="bg-[#FFD480] text-white w-[120px] text-center py-1 px-2 text-sm rounded-[4px] ">
                <span>Free Delivery</span>
              </div>
              <h2 className="heading2">Free Delivery</h2>
              <p className="text-textDim">
                Enjoy hassle-free shopping with free <br /> delivery on all your
                grocery needs.
              </p>
            </div>
            <div className="mt-auto w-max">
              <Link to="/products">
                <div className="primary-button flex items-center justify-center gap-3">
                  <span>Shop Now</span>
                  <FiArrowRight />
                </div>
              </Link>
            </div>
          </div>
          <img
            src={offer1}
            alt=""
            className="sm:max-h-full h-[50%] object-contain pr-2"
          />
        </div>
      </div>

      <div
        className="md:w-[50%] w-full flex flex-row items-end justify-between h-[300px]"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col h-full sm:pl-[40px] sm:py-[32px] p-3">
          <div className="flex flex-col gap-4">
            <div className="bg-baseGreen text-white py-1 w-[120px] text-sm rounded-[4px] text-center">
              <span>Choices</span>
            </div>
            <h2 className="heading2">Organic Food</h2>
            <p className="text-textDim">
              Organic food from leading brands around the world.
            </p>
          </div>
          <div className="mt-auto w-max">
            <Link to="/products">
              <div className="primary-button flex items-center justify-center gap-3">
                <span>Shop Now</span>
                <FiArrowRight />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <img
            src={offer2}
            alt=""
            className="sm:max-h-full h-[50%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
