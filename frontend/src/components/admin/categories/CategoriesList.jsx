import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import CategoriesItem from "./CategoriesItem";
import {
  fetchAdminCategories,
  getAdminCategoriesCurrentPage,
  getAdminCategoriesData,
  getAdminCategoriesFetchError,
  getAdminCategoriesFetchStatus,
  getAdminCategoriesLimit,
  getAdminCategoriesSearchQuery,
  getAdminCategoriesSortOrder,
  getAdminCategoriesTotalCategories,
  removeAdminCategoriesError,
} from "../../../redux/adminSlice/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminCategoriesData);
  const status = useSelector(getAdminCategoriesFetchStatus);
  const error = useSelector(getAdminCategoriesFetchError);

  const _currentPage = useSelector(getAdminCategoriesCurrentPage);
  const limit = useSelector(getAdminCategoriesLimit);
  const sortOrder = useSelector(getAdminCategoriesSortOrder);
  const totalCategories = useSelector(getAdminCategoriesTotalCategories);
  const searchQuery = useSelector(getAdminCategoriesSearchQuery);

  const [currentPage, setCurrentPage] = useState(_currentPage);

  const handlePageChange = () => {
    const params = {
      searchQuery: searchQuery,
      sortOrder: sortOrder,
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminCategories(params));
  };

  useEffect(() => {
    if (_currentPage !== currentPage) {
      handlePageChange();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(_currentPage);
  }, [_currentPage]);
console.log("category entry:",data)
  return (
    <div className="flex flex-col gap-3">
      {status == "failed" ? (
        <AlertBox
          message={error}
          type={status}
          toDispatch={removeAdminCategoriesError}
        />
      ) : null}
      <div className="grid-list-5 w-full relative">
        {status === "loading" ? (
          <div className="col-span-5">
            <SimpleLoading />
          </div>
        ) : null}
        {data.length === 0 ? (
          <p>No Categories found</p>
        ) : (
          data.map((entry) => <CategoriesItem key={entry.id} data={entry} />)
        )}
      </div>
      <Pagination
        page={currentPage}
        limit={limit}
        total={totalCategories}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default CategoriesList;
