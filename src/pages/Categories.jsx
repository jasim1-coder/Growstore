import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import CategorySearch from "../components/categories/CategorySearch";
import CategoryCard from "../components/categories/CategoryCard";
import {
  fetchCategories,
  getCategoriesCurrentPage,
  getCategoriesData,
  getCategoriesError,
  getCategoriesPageLimit,
  getCategoriesSearchQuery,
  getCategoriesStatus,
  getCategoriesTotalLength,
} from "../redux/slice/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/common/pagination/Pagination";

const Categories = () => {
  const dispatch = useDispatch();

  const data = useSelector(getCategoriesData);
  const query = useSelector(getCategoriesSearchQuery);

  const status = useSelector(getCategoriesStatus);
  const error = useSelector(getCategoriesError);

  const _page = useSelector(getCategoriesCurrentPage);
  const limit = useSelector(getCategoriesPageLimit);
  const totalCategories = useSelector(getCategoriesTotalLength);

  const [page, setPage] = useState(_page);

  const handlePageChange = () => {
    const params = {
      query,
      page,
      limit,
    };
    console.log(params);
    dispatch(fetchCategories(params));
  };

  useEffect(() => {
    if (_page !== page) {
      handlePageChange();
    }
  }, [page]);

  useEffect(() => {
    setPage(_page);
  }, [_page]);

  useEffect(() => {
    if (data.length === 0 && status !== "loading") {
      dispatch(fetchCategories({}));
    }
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col sm:gap-6 gap-4 sm:pt-6 sm:pb-12 py-6">
        <div className="self-end">
          <CategorySearch />
        </div>
        <div className="">
          <h2 className="heading2">Explore Categories</h2>
        </div>
        {status === "failed" ? (
          <p className="text-red-500">Error: {error}</p>
        ) : null}
        <div className="grid-list-5 w-full">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No Categories found</p>
          ) : (
            data.map((entry) => <CategoryCard key={entry._id} data={entry} />)
          )}
        </div>

        <Pagination
          page={page}
          limit={limit}
          total={totalCategories}
          setPage={setPage}
        />
      </div>
    </Layout>
  );
};

export default Categories;
