import React, { useEffect } from "react";
import ProfileLayout from "../../../components/shop/profile/ProfileLayout";
import AddAddressForm from "../../../components/shop/profile/address/AddressForm";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleAddress,
  getSingleAddress,
  getSingleFetchError,
  getSingleFetchStatus,
  getUpdateAddressError,
  getUpdateAddressStatus,
  removeSingleAddress,
  updateAddress,
} from "../../../redux/slice/addressSlice";
import AlertBox from "../../../components/common/AlertBox";
import { getUser } from "../../../redux/slice/authSlice";

const EditAddress = () => {
  const {id} = useParams();
  const user = useSelector(getUser);
  const userId = user.id;
  console.log("single addrsss :",id)
  console.log("userId:",userId)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchStatus = useSelector(getSingleFetchStatus);
  const fetchError = useSelector(getSingleFetchError);

  const updateStatus = useSelector(getUpdateAddressStatus);
  const updateError = useSelector(getUpdateAddressError);

  const initialValues = useSelector(getSingleAddress);
  

  const handleEditAddress = async (values) => {
    try {
      await dispatch(updateAddress({ userId, data: values })).unwrap();
      navigate("/profile/address");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchSingleAddress({userId, addressId:id}));

    return () => {
      dispatch(removeSingleAddress());
    };
  }, [id,userId]);
if(userId) console.log("initial values:",initialValues)
  return (
    <ProfileLayout>
      {fetchStatus === "failed" ? (
        <AlertBox type={fetchStatus} message={fetchError} />
      ) : null}
      {updateStatus === "failed" ? (
        <AlertBox type={updateStatus} message={updateError} />
      ) : null}

      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/profile/address"
            className="flex flex-row items-center gap-2 text-uiBlack"
          >
            <FiChevronLeft />
            <span className="">Back</span>
          </Link>
          <h2 className="heading2">Edit address</h2>
        </div>
        {fetchStatus === "loading" ? (
          <p className="text-bodyText">Loading...</p>
        ) : null}
        {fetchStatus === "success" ? (
          <AddAddressForm
            initialValues={initialValues}
            buttonName="Save"
            handleSubmit={handleEditAddress}
            status={updateStatus}
          />
        ) : null}
      </section>
    </ProfileLayout>
  );
};

export default EditAddress;
