import React from "react";
import AddressActions from "./AddressActions";

const AddressCard = ({ data }) => {
  return (
    <div className="p-4 border border-greyLight flex flex-col gap-3 rounded-sm">
      <div className="">
        <h4 className="heading4">{data.title}</h4>
      </div>
      <div className="">
        <span className="text-bodyText">{data.mobileNumber}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-bodyText">
          {data.street}, {data.city}
        </span>
        <span className="text-sm text-bodyText">
          {data.state}, {data.zipCode}
        </span>
        <span className="text-sm text-bodyText">{data.country}</span>
      </div>
      <AddressActions id={data._id} />
    </div>
  );
};

export default AddressCard;
