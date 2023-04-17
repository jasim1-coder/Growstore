import React, { useMemo, useState } from "react";
import useSortableData from "../../../utils/SortData";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import UserItem from "./UserItem";
import Pagination from "../../common/pagination/Pagination";

const data = [
  {
    _id: "abcd",
    name: "Sulav Giri",
    email: "sulav@gmail.com",
    mobileNumber: "980000000",
    createdAt: new Date(),
  },
  {
    _id: "abcde",
    name: "Sulav Giri",
    email: "sulav@gmail.com",
    mobileNumber: "980000000",
    createdAt: new Date(),
  },
  {
    _id: "abcdf",
    name: "Sulav Giri",
    email: "sulav@gmail.com",
    mobileNumber: "980000000",
    createdAt: new Date(),
  },
];

const UsersList = () => {
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
                  onClick={() => handleSort("name")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Name</span>
                  {sortConfig && sortKey === "name" ? (
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
              <th className="p-2">Email</th>
              <th className="p-2">Mobile Number</th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Created At</span>
                  {sortConfig && sortKey === "createdAt" ? (
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
                  No Users found
                </td>
              </tr>
            ) : (
              currentTableData.map((entry) => (
                <UserItem key={entry._id} data={entry} />
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

export default UsersList;
