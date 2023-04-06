import React from "react";
import { useSelector } from "react-redux";
import { getUserEmail, getUserName } from "../../../redux/slice/authSlice";

const AddressSummary = ({ data }) => {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);

  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Shipping Address</h3>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Name</p>
          <p className="font-medium text-bodyText">{name}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Email</p>
          <p className="font-medium text-bodyText">{email}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Mobile Number</p>
          <p className="font-medium text-bodyText">{data.mobileNumber}</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Street</p>
          <p className="font-medium text-bodyText">{data.street}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">City</p>
          <p className="font-medium text-bodyText">{data.city}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">State</p>
          <p className="font-medium text-bodyText">{data.state}</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">ZIP Code</p>
          <p className="font-medium text-bodyText">{data.zipCode}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Country</p>
          <p className="font-medium text-bodyText">{data.country}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressSummary;
