import React, { useEffect } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import UserInfo from "../../components/admin/users/UserInfo";
import UserOrderHistory from "../../components/admin/users/UserOrderHistory";
import UserAddressesInfo from "../../components/admin/users/UserAddressesInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminSingleUser,
  getAdminSingleUserFetchError,
  getAdminSingleUserFetchStatus,
  getAdminSingleUsersData,
  removeAdminSingleUser,
} from "../../redux/adminSlice/usersSlice";
import { useParams } from "react-router-dom";
import UserCartInfo from "../../components/admin/users/UserCartInfo";
import UserWishlistInfo from "../../components/admin/users/UserWishlistInfo";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import AlertBox from "../../components/common/AlertBox";

const AdminManageUsers = () => {
  const dispatch = useDispatch();
const { id } = useParams();
console.log("id:",id)

  const userData = useSelector(getAdminSingleUsersData);
  const status = useSelector(getAdminSingleUserFetchStatus);
  const error = useSelector(getAdminSingleUserFetchError);

  useEffect(() => {
    dispatch(fetchAdminSingleUser(id));
console.log("specific user dataa",userData)
    return () => {
      dispatch(removeAdminSingleUser());
    };
  }, []);

  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      <div className="adminContainer">
        <AdminPageHeader title="Manage Users" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/users" />
          </div>

          <div className="flex flex-col relative">
            {status === "loading" ? (
              <div className="w-full">
                <SimpleLoading />
              </div>
            ) : null}

            {userData.createdAt ? (
              <UserInfo
                data={{
                  name: userData.name,
                  email: userData.email,
                  mobileNumber: userData.mobileNumber,
                  password: "",
                }}
                createdAt={userData.createdAt}
                active={userData.active}
              />
            ) : null}
            <UserOrderHistory data={userData.orders} userId={userData.id} />
            <UserCartInfo data={userData.cart} />
            <UserWishlistInfo data={userData.wishlist} />
            <UserAddressesInfo data={userData.addresses} />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageUsers;
