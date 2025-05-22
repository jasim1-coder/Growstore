import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import UserItem from "./UserItem";
import Pagination from "../../common/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  getAdminUsersCurrentPage,
  getAdminUsersData,
  getAdminUsersFetchError,
  getAdminUsersFetchStatus,
  getAdminUsersLimit,
  getAdminUsersNameQuery,
  getAdminUsersSortOrder,
  getAdminUsersTotalUsers,
  removeAdminUsersError,
} from "../../../redux/adminSlice/usersSlice";
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";

const UsersList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminUsersData);
  const status = useSelector(getAdminUsersFetchStatus);
  const error = useSelector(getAdminUsersFetchError);

  const _currentPage = useSelector(getAdminUsersCurrentPage);
  const limit = useSelector(getAdminUsersLimit);
  const sortOrder = useSelector(getAdminUsersSortOrder);
  const totalUsers = useSelector(getAdminUsersTotalUsers);
  const nameQuery = useSelector(getAdminUsersNameQuery);

  const [currentPage, setCurrentPage] = useState(_currentPage);

  const [sortKey, setSortKey] = useState(sortOrder);

  const handleSort = (key) => {
    let newSortOrder;
    if (!sortKey[key] || sortKey[key] === 1) {
      newSortOrder = { [key]: -1 };
    } else {
      newSortOrder = { [key]: 1 };
    }
    const _newSortOrder = JSON.stringify(newSortOrder);
    const params = {
      nameQuery: nameQuery,
      sortOrder: _newSortOrder,
    };
    dispatch(fetchAdminUsers(params));
  };

  const handlePageChange = () => {
    const params = {
      nameQuery: nameQuery,
      sortOrder: JSON.stringify(sortKey),
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminUsers(params));
  };

  useEffect(() => {
    if (_currentPage !== currentPage) {
      handlePageChange();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(_currentPage);
  }, [_currentPage]);

  useEffect(() => {
    if (sortOrder) {
      setSortKey(JSON.parse(sortOrder));
    }
  }, [sortOrder]);
  console.log("User Detals:",data)

  return (
    <div className="flex flex-col gap-3">
      {status == "failed" ? (
        <AlertBox
          message={error}
          type={status}
          toDispatch={removeAdminUsersError}
        />
      ) : null}
      {/* Table Section */}
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm">
            <tr className="border-b p-2  tracking-wider">
              <th className="p-2">
                <button
                  onClick={() => handleSort("name")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Name</span>
                  {sortKey?.name ? (
                    sortKey.name === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">Email</th>
              <th className="p-2">Mobile Number</th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Created At</span>
                  {sortKey?.createdAt ? (
                    sortKey.createdAt === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody className="relative h-full w-full">
            {status === "loading" ? (
              <tr>
                <td colSpan={5} className="p-4">
                  <SimpleLoading />
                </td>
              </tr>
            ) : null}
            {data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="5" className="text-center px-2 py-4">
                  No Users found
                </td>
              </tr>
            ) : (
              data.map((entry) => <UserItem key={entry.id} data={entry} />)
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={currentPage}
        limit={limit}
        total={totalUsers}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersList;
