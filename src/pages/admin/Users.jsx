import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import UsersList from "../../components/admin/users/UsersList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  getAdminUsersData,
  getAdminUsersNameQuery,
} from "../../redux/adminSlice/usersSlice";
import AdminSearchBar from "../../components/admin/commons/AdminSearchBar";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(getAdminUsersData);
  const _nameQuery = useSelector(getAdminUsersNameQuery);

  const [nameQuery, setNameQuery] = useState(_nameQuery);

  const handleSearch = (e) => {
    setNameQuery(e.target.value);
    const params = {
      nameQuery: e.target.value,
    };
    dispatch(fetchAdminUsers(params));
  };

  useEffect(() => {
    if (usersData.length === 0) {
      const params = {
        nameQuery: _nameQuery,
      };
      dispatch(fetchAdminUsers(params));
    }
  }, []);

  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Users" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">User List</h4>
            <AdminSearchBar
              value={nameQuery}
              onChange={handleSearch}
              placeholder="Search by name..."
            />
          </div>
          <UsersList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
