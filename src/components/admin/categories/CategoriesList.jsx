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
import { ImSpinner8 } from "react-icons/im";
import AlertBox from "../../common/AlertBox";

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
            <div className="absolute top-0 left-0 w-full h-full bg-greyLight/50">
              <div className="flex w-full h-full justify-center items-center">
                <ImSpinner8 className="text-[66px] animate-spin text-uiBlue" />
              </div>
            </div>
          </div>
        ) : null}
        {data.length === 0 ? (
          <p>No Categories found</p>
        ) : (
          data.map((entry) => <CategoriesItem key={entry._id} data={entry} />)
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
