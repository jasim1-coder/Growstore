import React from "react";
import { Link } from "react-router-dom";

const CategoriesItem = ({ data }) => {
  return (
    <Link to={`/admin/categories/${data._id}`}>
      <div className="m-auto max-w-[250px] border border-greyLight flex flex-col rounded-md">
        <img
          className="object-cover h-[150px] w-full rounded-tr-md rounded-tl-md"
          src={data.featuredImage}
          alt=""
        />
        <div className="mt-auto p-2">
          <p className="text-uiBlack font-medium">{data.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesItem;
