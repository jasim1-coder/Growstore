import React, { useMemo, useState } from "react";
import useSortableData from "../../../utils/SortData";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { product } from "../../../assets";
import ProductItem from "./ProductItem";
import Pagination from "../../common/pagination/Pagination";

const data = [
  {
    _id: "abcde",
    imageUrl: product,
    title: "Product Name",
    brand: "amazon",
    category: "veggies",
    stock: "100",
    price: "1000.34",
  },
  {
    _id: "abcdd",
    imageUrl: product,
    title: "Product Name",
    brand: "amazon",
    category: "veggies",
    stock: "100",
    price: "1000.34",
  },
  {
    _id: "abcf",
    imageUrl: product,
    title: "Product Name",
    brand: "amazon",
    category: "veggies",
    stock: "100",
    price: "1000.34",
  },
];

const ProductsList = () => {
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
              <th className="p-2">Product</th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("title")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Title</span>
                  {sortConfig && sortKey === "title" ? (
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
                  onClick={() => handleSort("category")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Category</span>
                  {sortConfig && sortKey === "category" ? (
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
                  onClick={() => handleSort("brand")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Brand</span>
                  {sortConfig && sortKey === "brand" ? (
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
                  onClick={() => handleSort("price")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Price</span>
                  {sortConfig && sortKey === "price" ? (
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
                  onClick={() => handleSort("stock")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Stock</span>
                  {sortConfig && sortKey === "stock" ? (
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
                  No Products found
                </td>
              </tr>
            ) : (
              currentTableData.map((entry) => (
                <ProductItem key={entry._id} data={entry} />
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

export default ProductsList;

// image, title, category brand, price, stock
