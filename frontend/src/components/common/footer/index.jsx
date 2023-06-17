import React from "react";
import MainFooter from "./MainFooter";
import SecondaryFooter from "./SecondaryFooter";

const Footer = () => {
  return (
    <div className="mt-auto bg-lightGreen">
      <div className="container">
        <MainFooter />
        <SecondaryFooter />
      </div>
    </div>
  );
};

export default Footer;
