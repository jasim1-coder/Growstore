import React from "react";
import { FiSearch } from "react-icons/fi";

const AdminSearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex flex-row">
      <div className="bg-baseGreen px-2 text-uiWhite border border-baseGreen border-r-0 flex items-center justify-center rounded-l-sm">
        <FiSearch />
      </div>
      <input
        type="search"
        className="px-2 py-1 border border-greyLight border-l-0 rounded-r-sm text-sm"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AdminSearchBar;
