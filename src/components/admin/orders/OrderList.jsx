import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import OrderItem from "./OrderItem";
import Pagination from "../../common/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  getAdminOrderCurrentPage,
  getAdminOrderFetchError,
  getAdminOrderFetchStatus,
  getAdminOrderIdQuery,
  getAdminOrderLimit,
  getAdminOrderSortOrder,
  getAdminOrderTotalOrders,
  getAdminOrdersData,
  removeAdminOrdersError,
} from "../../../redux/adminSlice/ordersSlice";
import { ImSpinner8 } from "react-icons/im";
import AlertBox from "../../common/AlertBox";

const OrderList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminOrdersData);
  const status = useSelector(getAdminOrderFetchStatus);
  const error = useSelector(getAdminOrderFetchError);

  const _currentPage = useSelector(getAdminOrderCurrentPage);
  const limit = useSelector(getAdminOrderLimit);
  const sortOrder = useSelector(getAdminOrderSortOrder);
  const totalOrders = useSelector(getAdminOrderTotalOrders);
  const orderIdQuery = useSelector(getAdminOrderIdQuery);

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
      orderIdQuery: orderIdQuery,
      sortOrder: _newSortOrder,
    };
    dispatch(fetchAdminOrders(params));
  };

  const handlePageChange = () => {
    const params = {
      orderIdQuery: orderIdQuery,
      sortOrder: JSON.stringify(sortKey),
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminOrders(params));
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

  return (
    <div className="flex flex-col gap-3">
      {status == "failed" ? (
        <AlertBox
          message={error}
          type={status}
          toDispatch={removeAdminOrdersError}
        />
      ) : null}
      {/* Table Section */}
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm uppercase">
            <tr className="border-b p-2 text-textSecondary tracking-wider">
              <th className="p-2">
                <button
                  onClick={() => handleSort("orderId")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Order ID</span>
                  {sortKey?.orderId ? (
                    sortKey.orderId === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("userName")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>User</span>
                  {sortKey?.userName ? (
                    sortKey.userName === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("orderDate")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Date</span>
                  {sortKey?.orderDate ? (
                    sortKey.orderDate === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("totalAmount")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Amount</span>
                  {sortKey?.totalAmount ? (
                    sortKey.totalAmount === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("status")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Status</span>
                  {sortKey?.status ? (
                    sortKey.status === -1 ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="relative h-full w-full">
            {status === "loading" ? (
              <tr>
                <td colSpan={5}>
                  <div className="absolute top-0 left-0 w-full h-full bg-greyLight/50">
                    <div className="flex w-full h-full justify-center items-center">
                      <ImSpinner8 className="text-[66px] animate-spin text-uiBlue" />
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
            {data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="5" className="text-center px-2 py-4">
                  No Orders found
                </td>
              </tr>
            ) : (
              data.map((entry) => <OrderItem key={entry._id} data={entry} />)
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={currentPage}
        limit={limit}
        total={totalOrders}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default OrderList;
