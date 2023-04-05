import React from "react";

const AddressSummary = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Shipping Address</h3>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Name</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Email</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Mobile Number</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Street</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">City</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">State</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
      </div>
      <div className="grid-list-3">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">ZIP Code</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Country</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
      </div>
    </div>
  );
};

export default AddressSummary;
