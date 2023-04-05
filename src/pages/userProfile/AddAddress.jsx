import React from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import AddAddressForm from "../../components/profile/address/AddressForm";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  getAddAddressError,
  getAddAddressStatus,
  removeAddErrorMessage,
} from "../../redux/slice/addressSlice";
import AlertBox from "../../components/common/AlertBox";

const initialValues = {
  title: "",
  street: "",
  city: "",
  state: "",
  country: "India",
  zipCode: "",
  mobileNumber: "",
};

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(getAddAddressStatus);
  const error = useSelector(getAddAddressError);

  const handleAddAddress = async (values) => {
    try {
      await dispatch(addAddress(values)).unwrap();
      navigate("/profile/address");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileLayout>
      {status === "failed" ? (
        <AlertBox
          type={status}
          message={error}
          toDispatch={removeAddErrorMessage}
        />
      ) : null}

      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/profile/address"
            className="flex flex-row items-center gap-2 text-uiBlack w-max"
          >
            <FiChevronLeft />
            <span className="">Back</span>
          </Link>
          <h2 className="heading2">Add new address</h2>
        </div>
        <AddAddressForm
          initialValues={initialValues}
          buttonName="Add"
          handleSubmit={handleAddAddress}
          status={status}
        />
      </section>
    </ProfileLayout>
  );
};

export default AddAddress;
