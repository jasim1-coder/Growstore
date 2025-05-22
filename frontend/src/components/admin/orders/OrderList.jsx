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
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";

const OrderList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminOrdersData);
  console.log("To get the order details:")
  const status = useSelector(getAdminOrderFetchStatus);
  const error = useSelector(getAdminOrderFetchError);

  const _currentPage = useSelector(getAdminOrderCurrentPage);
  const limit = useSelector(getAdminOrderLimit);
  const sortOrder = useSelector(getAdminOrderSortOrder);
  const totalOrders = useSelector(getAdminOrderTotalOrders);
  const orderIdQuery = useSelector(getAdminOrderIdQuery);

  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sortKey, setSortKey] = useState(sortOrder);

  // Dispatch fetch on initial render
  useEffect(() => {
    const params = {
      orderIdQuery: orderIdQuery,
      sortOrder: JSON.stringify(sortKey),
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminOrders(params));  // Fetch orders on initial load
  }, [dispatch, orderIdQuery, sortKey, currentPage, limit]);  // Ensure params change triggers new fetch

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
  useEffect(() => {
  const params = {
    orderIdQuery: orderIdQuery || "", // Fallback to empty string if undefined or empty
    page: currentPage,
    limit: limit,
    sortOrder: JSON.stringify(sortKey),
  };

  // Dispatch the action to fetch data
  dispatch(fetchAdminOrders(params));
}, [orderIdQuery, currentPage, sortKey, dispatch]);


  return (
    <div className="flex flex-col gap-3">
      {status === "failed" && error ? (
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
          <thead className="text-sm">
            <tr className="border-b p-2 tracking-wider">
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
                  {sortKey?.user?.userName ? (
                    sortKey.user?.sortOrder === -1 ? (
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
                <td colSpan={5} className="p-4">
                  <SimpleLoading />
                </td>
              </tr>
            ) : null}
            {Array.isArray(data) && data.length === 0 ? (
              <tr className="text-center">
                <td colSpan="5" className="text-center px-2 py-4">
                  No Orders found
                </td>
              </tr>
            ) : (
              Array.isArray(data) && data.map((entry) => <OrderItem key={entry._id} data={entry} />)
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
