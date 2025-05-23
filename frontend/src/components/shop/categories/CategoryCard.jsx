import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <Link to={`/categories/${data.id}`}>
      <div className="m-auto sm:min-h-[250px] min-h-[200px] h-full max-w-[250px] border border-greyLight flex flex-col items-center rounded-sm">
        <img
          className="object-contain h-[200px] w-full"
          src={data.featuredImage}
          alt=""
        />
        <div className="text-center mt-auto p-4">
          <p className="text-uiBlack text-[18px] font-medium">{data.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
