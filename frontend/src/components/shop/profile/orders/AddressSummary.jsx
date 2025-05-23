import React from "react";
import { useSelector } from "react-redux";
import { getUserEmail, getUserName } from "../../../../redux/slice/authSlice";

const AddressSummary = ({ data }) => {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  console.log("Data for the single order latest:",data)

  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Shipping Address</h3>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Name</p>
          <p className="text-bodyText">{name}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Email</p>
          <p className="text-bodyText">{email}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Mobile Number</p>
          <p className="text-bodyText">{data?.shippingAddress?.mobileNumber}</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Street</p>
          <p className="text-bodyText">{data?.shippingAddress?.street}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">City</p>
          <p className="text-bodyText">{data?.shippingAddress?.city}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">State</p>
          <p className="text-bodyText">{data?.shippingAddress?.state}</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">ZIP Code</p>
          <p className="text-bodyText">{data?.shippingAddress?.zip}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Country</p>
          <p className="text-bodyText">{data?.shippingAddress?.country}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressSummary;
