import React from "react";
import { useDispatch } from "react-redux";

const ShippingCard = ({ data, active = false, setAddressId }) => {
  const dispatch = useDispatch();

  const handleShippingAddress = () => {
    dispatch(setAddressId(data._id));
  };
  return (
    <button
      type="button"
      onClick={handleShippingAddress}
      className={`p-4 border ${
        active ? "border-baseGreen shadow-md" : "border-greyLight"
      } flex flex-col gap-3 rounded-sm text-left`}
    >
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
    </button>
  );
};

export default ShippingCard;
