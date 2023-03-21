import React, { useState } from "react";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";

const AccountDetails = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Sulav Giri");
  const [nameError, setNameError] = useState("");

  const [mobile, setMobile] = useState("9800000000");
  const [mobileNoError, setMobileNoError] = useState("");

  const handleEdit = () => {
    setEdit(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center py-2 border-b border-b-greyLight">
        <h3 className="heading4">Account Information</h3>
        <div className="flex flex-row gap-4 items-center">
          {edit ? (
            <>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
              >
                <FiXCircle />
                <span className="text-sm">Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="text-uiWhite border-baseGreen bg-baseGreen border py-2 px-4 rounded-sm hover:bg-darkGreen transition-all duration-150 flex items-center justify-center gap-2"
              >
                <FiSave />
                <span className="text-sm">Save</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
            >
              <FiEdit />
              <span className="text-sm">Edit</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <div className="sm:sm:w-[30%]">
          <span className="text-sm text-textDim">
            Your personal details at our website. You can edit these information
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1 sm:gap-6 gap-3">
          <div className="flex sm:flex-row flex-col justify-between flex-1 sm:gap-6 gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              {edit ? (
                <>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError("");
                    }}
                    className="p-2 border border-uiGrey bg-greyLight text-sm rounded-sm"
                  />
                  {nameError && (
                    <span className="input-error">{nameError}</span>
                  )}
                </>
              ) : (
                <span className="font-medium text-bodyText">{name}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="mobile" className="text-sm">
                Mobile Number
              </label>
              {edit ? (
                <>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setMobileNoError("");
                    }}
                    className="p-2 border border-uiGrey bg-greyLight text-sm rounded-sm"
                  />
                  {mobileNoError && (
                    <span className="input-error">{mobileNoError}</span>
                  )}
                </>
              ) : (
                <span className="font-medium text-bodyText">{mobile}</span>
              )}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between flex-1 sm:gap-6 gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm">Customer Since</p>
              <p className="font-medium text-bodyText">2023-01-01</p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm">Total Orders</p>
              <p className="font-medium text-bodyText">10</p>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between flex-1 sm:gap-6 gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm">Total Reviews</p>
              <p className="font-medium text-bodyText">10</p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm">Total Expense</p>
              <p className="font-medium text-bodyText">10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
