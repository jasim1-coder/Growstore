import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminBackButton = ({ to }) => {
  return (
    <Link to={to} className="w-max flex flex-row gap-2 items-center">
      <FiChevronLeft />
      <span>Back</span>
    </Link>
  );
};

export default AdminBackButton;
