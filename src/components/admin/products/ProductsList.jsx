import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import ProductItem from "./ProductItem";
import Pagination from "../../common/pagination/Pagination";
import AlertBox from "../../common/AlertBox";
import {
  fetchAdminProducts,
  getAdminProductsCurrentPage,
  getAdminProductsData,
  getAdminProductsFetchError,
  getAdminProductsFetchStatus,
  getAdminProductsLimit,
  getAdminProductsNameQuery,
  getAdminProductsSortOrder,
  getAdminProductsTotalProducts,
  removeAdminProductsError,
} from "../../../redux/adminSlice/productsSlice";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const ProductsList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminProductsData);
  const status = useSelector(getAdminProductsFetchStatus);
  const error = useSelector(getAdminProductsFetchError);

  const _currentPage = useSelector(getAdminProductsCurrentPage);
  const limit = useSelector(getAdminProductsLimit);
  const sortOrder = useSelector(getAdminProductsSortOrder);
  const totalProducts = useSelector(getAdminProductsTotalProducts);
  const nameQuery = useSelector(getAdminProductsNameQuery);

  const [currentPage, setCurrentPage] = useState(_currentPage);

  const [sortKey, setSortKey] = useState(sortOrder);

  const handleSort = (key) => {
    let newSortOrder;
    if (!sortKey || !sortKey[key] || sortKey[key] === 1) {
      newSortOrder = { [key]: -1 };
    } else {
      newSortOrder = { [key]: 1 };
    }
    const _newSortOrder = JSON.stringify(newSortOrder);
    const params = {
      nameQuery: nameQuery,
      sortOrder: _newSortOrder,
    };
    dispatch(fetchAdminProducts(params));
  };

  const handlePageChange = () => {
    const params = {
      nameQuery: nameQuery,
      sortOrder: JSON.stringify(sortKey),
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminProducts(params));
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
          toDispatch={removeAdminProductsError}
        />
      ) : null}
      {/* Table Section */}
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm">
            <tr className="border-b p-2 tracking-wider">
              <th className="p-2">Product</th>
              <th className="p-2">
                <button
                  onClick={() => handleSort("title")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Title</span>
                  {sortKey?.title ? (
                    sortKey.title === -1 ? (
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
                  {sortKey?.category ? (
                    sortKey.category === -1 ? (
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
                  {sortKey?.brand ? (
                    sortKey.brand === -1 ? (
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
                  {sortKey?.price ? (
                    sortKey.price === -1 ? (
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
                  onClick={() => handleSort("quantity")}
                  className="flex flex-row gap-2 items-center"
                >
                  <span>Stock</span>
                  {sortKey?.quantity ? (
                    sortKey.quantity === -1 ? (
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
                <td colSpan={4}>
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
                <td colSpan="7" className="text-center px-2 py-4">
                  No Products found
                </td>
              </tr>
            ) : (
              data.map((entry) => <ProductItem key={entry._id} data={entry} />)
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={currentPage}
        limit={limit}
        total={totalProducts}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductsList;
