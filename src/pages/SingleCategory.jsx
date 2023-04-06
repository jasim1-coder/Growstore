import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchCategoriesProduct,
  getCategoriesProduct,
  getCategoriesProductError,
  getCategoriesProductStatus,
  getCategoryName,
  removeCategoriesProductData,
} from "../redux/slice/categoriesSlice";
import ProductCard from "../components/product/ProductCard";
import CategorySearch from "../components/categories/CategorySearch";
import { FiChevronLeft } from "react-icons/fi";

const SingleCategory = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const data = useSelector(getCategoriesProduct);
  const categoryName = useSelector(getCategoryName);
  const status = useSelector(getCategoriesProductStatus);
  const error = useSelector(getCategoriesProductError);

  useEffect(() => {
    dispatch(fetchCategoriesProduct(id));
    return () => {
      dispatch(removeCategoriesProductData());
    };
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col sm:gap-6 gap-4 sm:pt-6 sm:pb-12 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/categories"
            className="flex flex-row items-center gap-2 text-uiBlack"
          >
            <FiChevronLeft />
            <span className="">Back</span>
          </Link>
          <CategorySearch />
        </div>
        <div className="">
          <h3 className="heading3">Products for "{categoryName}" Category</h3>
        </div>
        {status === "failed" ? (
          <p className="text-red-500">Error: {error}</p>
        ) : null}
        <div className="grid-list-4 w-full">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No Products found</p>
          ) : (
            data.map((entry) => <ProductCard key={entry._id} data={entry} />)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleCategory;
