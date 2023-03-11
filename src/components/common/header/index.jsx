import React from "react";
import MainHeader from "./MainHeader";
import SecondaryHeader from "./SecondaryHeader";

const Header = () => {
  return (
    <div className="bg-formBackground shadow-sm">
      <div className="container">
        <MainHeader />
        <SecondaryHeader />
      </div>
    </div>
  );
};

export default Header;
