import React, { useEffect } from "react";
import ProfileLayout from "../../../components/shop/profile/ProfileLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddress,
  getAllAddress,
  getFetchAddressStatus,
} from "../../../redux/slice/addressSlice";
import AddressCard from "../../../components/shop/profile/address/AddressCard";
import { getFeaturedProductError } from "../../../redux/slice/productSlice";
import { getUser } from "../../../redux/slice/authSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const addressData = useSelector(getAllAddress);
  const status = useSelector(getFetchAddressStatus);
  const error = useSelector(getFeaturedProductError);

  const userId = user?.id;
  console.log("userId : ",userId)
  console.log("address data that lookin for:",addressData)

  useEffect(() => {
    
// or get it from Redux
      if (user && userId) {
        
        dispatch(fetchAddress(userId));
      }
    
  }, [userId,user]);
  

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
