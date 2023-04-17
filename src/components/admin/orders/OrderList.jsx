import React, { useMemo, useState } from "react";
import useSortableData from "../../../utils/SortData";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import OrderItem from "./OrderItem";
import Pagination from "../../common/pagination/Pagination";

const data = [
  {
    _id: "abcde",
    orderId: "Order-1",
    userName: "Sulav Giri",
    date: new Date(),
    totalAmount: "1000.00",
    status: "Placed",
  },
  {
    _id: "abcdef",
    orderId: "Order-2",
    userName: "Sulav Giri",
    date: new Date(),
    totalAmount: "1000.00",
    status: "Processing",
  },
  {
    _id: "abcdeg",
    orderId: "Order-3",
    userName: "Sulav Giri",
    date: new Date(),
    totalAmount: "1000.00",
    status: "Cancelled",
  },
  {
    _id: "abcdeh",
    orderId: "Order-4",
    userName: "Sulav Giri",
    date: new Date(),
    totalAmount: "1000.00",
    status: "Cancelled",
  },
];
const OrderList = () => {
  const pageSize = 5;

  const { items, requestSort, sortConfig } = useSortableData(data);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return items?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, items]);

  const len = data?.length;

  const [sortKey, setSortKey] = useState("");

  const handleSort = (key) => {
    requestSort(key);
    setSortKey(key);
  };

  return (
    <div className="flex flex-col gap-3">
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
                  {sortConfig && sortKey === "orderId" ? (
                    sortConfig.direction === "ascending" ? (
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
                  {sortConfig && sortKey === "userName" ? (
                    sortConfig.direction === "ascending" ? (
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
                  onClick={() => handleSort("date")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Date</span>
                  {sortConfig && sortKey === "date" ? (
                    sortConfig.direction === "ascending" ? (
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
                  {sortConfig && sortKey === "totalAmount" ? (
                    sortConfig.direction === "ascending" ? (
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
                  {sortConfig && sortKey === "status" ? (
                    sortConfig.direction === "ascending" ? (
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
          <tbody>
            {data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="7" className="text-center px-2 py-4">
                  No Orders found
                </td>
              </tr>
            ) : (
              currentTableData.map((entry) => (
                <OrderItem key={entry._id} data={entry} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={len}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default OrderList;
