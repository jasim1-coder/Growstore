import React from "react";

const UserAddressesInfo = ({ data }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="pb-3 border-b border-b-greyLight">
        <h4 className="heading4">Addresses</h4>
      </div>
      <div className="grid-list-3 pt-3">
        {!data || data.length === 0 ? (
          <p className="text-bodyText">No Address found</p>
        ) : (
          data.map((entry) => (
            <div
              key={entry._id}
              className="p-4 border border-greyLight flex flex-col gap-3 rounded-sm"
            >
              <div className="">
                <h4 className="heading4">{entry.title}</h4>
              </div>
              <div className="">
                <span className="text-bodyText">{entry.mobileNumber}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-bodyText">
                  {entry.street}, {entry.city}
                </span>
                <span className="text-sm text-bodyText">
                  {entry.state}, {entry.zipCode}
                </span>
                <span className="text-sm text-bodyText">{entry.country}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserAddressesInfo;
