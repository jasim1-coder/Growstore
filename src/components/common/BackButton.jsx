import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="w-max flex flex-row gap-2 items-center"
    >
      <FiChevronLeft />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
