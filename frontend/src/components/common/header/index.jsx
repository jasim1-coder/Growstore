import React, { useState } from "react";
import MainHeader from "./MainHeader";
import SecondaryHeader from "./SecondaryHeader";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <>
      <MainHeader handleMenu={handleMenu} />
      <SecondaryHeader showMenu={showMenu} />
    </>
  );
};

export default Header;
