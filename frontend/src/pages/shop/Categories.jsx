import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import CategorySearch from "../../components/shop/categories/CategorySearch";
import CategoryCard from "../../components/shop/categories/CategoryCard";
import {
  fetchCategories,
  getCategoriesCurrentPage,
  getCategoriesData,
  getCategoriesError,
  getCategoriesPageLimit,
  getCategoriesSearchQuery,
  getCategoriesStatus,
  getCategoriesTotalLength,
} from "../../redux/slice/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/common/pagination/Pagination";

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
    // Only dispatch if the page has changed to avoid redundant fetches
    if (page !== _page) {
      const params = { query, page, limit };
      dispatch(fetchCategories(params)); // Dispatch to fetch categories
    }
  };

  // Whenever page or any relevant state changes, trigger the page change
  useEffect(() => {
    // Fetch categories when page changes
    handlePageChange();
  }, [page, _page, dispatch, query, limit]);

  // Sync local state page with Redux page
  useEffect(() => {
    setPage(_page);
  }, [_page]);

  // Fetch categories on initial load if there are no categories
useEffect(() => {
  if (data.length === 0 && status !== "loading") {
    console.log("Fetching categories on initial load");
    dispatch(fetchCategories({ query, page: 1, limit }));
  }
}, [dispatch, data, status, query, page, limit]);


  return (
    <Layout>
      <div className="container flex flex-col sm:gap-6 gap-4 sm:pt-6 sm:pb-12 py-6">
        <div className="self-end">
          <CategorySearch />
        </div>
        <div>
          <h2 className="heading2">Explore Categories</h2>
        </div>
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}

        <div className="grid-list-5 w-full">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No categories found</p>
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
