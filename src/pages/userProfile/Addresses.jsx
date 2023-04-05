import React, { useEffect } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddress,
  getAllAddress,
  getFetchAddressStatus,
} from "../../redux/slice/addressSlice";
import AddressCard from "../../components/profile/address/AddressCard";
import { getFeaturedProductError } from "../../redux/slice/productSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const addressData = useSelector(getAllAddress);
  const status = useSelector(getFetchAddressStatus);
  const error = useSelector(getFeaturedProductError);

  useEffect(() => {
    if (addressData.length === 0) {
      dispatch(fetchAddress());
    }
  }, []);

  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="">
          <h2 className="heading2">My Addresses</h2>
          <span className="text-sm text-textDim">
            Here you can view, edit, delete and add your delivery and billing
            address.
          </span>
        </div>
        {status === "loading" ? (
          <p className="text-bodyText">Loading...</p>
        ) : null}
        {status === "failed" ? (
          <p className="text-uiRed">Error: {error}</p>
        ) : null}
        <div className="grid-list-3">
          {status === "success"
            ? addressData.map((entry, key) => (
                <AddressCard key={key} data={entry} />
              ))
            : null}
          <div className="flex items-center justify-center border border-greyLight">
            <Link
              to="/profile/address/add"
              className="primary-button font-normal mt-2"
            >
              Add New Address
            </Link>
          </div>
        </div>
      </section>
    </ProfileLayout>
  );
};

export default Addresses;
