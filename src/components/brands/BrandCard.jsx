import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ data }) => {
  return (
    <Link to={`/brands/${data._id}`}>
      <div className="m-auto sm:min-h-[250px] min-h-[200px] h-full max-w-[250px] border border-greyLight flex flex-col items-center rounded-sm">
        <img
          className="object-contain h-[200px] w-full"
          src={data.imageUrl}
          alt=""
        />
        <div className="text-center mt-auto p-4">
          <p className="text-uiBlack text-[18px] font-medium">{data.title}</p>
          <p className="text-textDim text-sm">{data.count} items</p>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
