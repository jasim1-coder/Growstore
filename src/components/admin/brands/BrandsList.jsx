import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import Brandsitem from "./Brandsitem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminBrands,
  getAdminBrandsCurrentPage,
  getAdminBrandsData,
  getAdminBrandsFetchError,
  getAdminBrandsFetchStatus,
  getAdminBrandsLimit,
  getAdminBrandsSearchQuery,
  getAdminBrandsSortOrder,
  getAdminBrandsTotalBrands,
  removeAdminBrandsError,
} from "../../../redux/adminSlice/brandsSlice";
import { ImSpinner8 } from "react-icons/im";
import AlertBox from "../../common/AlertBox";

const BrandsList = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAdminBrandsData);
  const status = useSelector(getAdminBrandsFetchStatus);
  const error = useSelector(getAdminBrandsFetchError);

  const _currentPage = useSelector(getAdminBrandsCurrentPage);
  const limit = useSelector(getAdminBrandsLimit);
  const sortOrder = useSelector(getAdminBrandsSortOrder);
  const totalBrands = useSelector(getAdminBrandsTotalBrands);
  const searchQuery = useSelector(getAdminBrandsSearchQuery);

  const [currentPage, setCurrentPage] = useState(_currentPage);

  const handlePageChange = () => {
    const params = {
      searchQuery: searchQuery,
      sortOrder: sortOrder,
      page: currentPage,
      limit,
    };
    dispatch(fetchAdminBrands(params));
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
          toDispatch={removeAdminBrandsError}
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
          <p>No Brands found</p>
        ) : (
          data.map((entry) => <Brandsitem key={entry._id} data={entry} />)
        )}
      </div>
      <Pagination
        page={currentPage}
        limit={limit}
        total={totalBrands}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default BrandsList;
