import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import Pagination from "../../components/common/pagination/Pagination";
import OrderFilter from "../../components/shop/filters/OrderFilter";
import ProductFilters from "../../components/shop/filters/ProductFilters";
import ProductCard from "../../components/shop/product/ProductCard";
import {
  fetchFilteredProducts,
  getFilteredProducts,
  getFilterStatus,
  getSearchBrand,
  getSearchCategory,
  getSearchCurrentPage,
  getSearchOrder,
  getSearchPageLimit,
  getSearchPrice,
  getSearchQuery,
  getsearchResultsCount,
} from "../../redux/slice/productSlice";

const ProductListing = () => {
  const dispatch = useDispatch();
  const data = useSelector(getFilteredProducts);
  const status = useSelector(getFilterStatus);
  const _page = useSelector(getSearchCurrentPage);
  const limit = useSelector(getSearchPageLimit);
  const totalProducts = useSelector(getsearchResultsCount);

  const order = useSelector(getSearchOrder);
  const query = useSelector(getSearchQuery);
  const priceRange = useSelector(getSearchPrice);
  const categories = useSelector(getSearchCategory);
  const brands = useSelector(getSearchBrand);

  const [page, setPage] = useState(_page);
  const [sortOrder, setSortOrder] = useState(order);

  const handleOrderChange = (e) => {
    const _categories = categories?.value;
    const _brands = brands.map((entry) => entry.value);
    const params = {
      query,
      order: e.target.value,
      price: priceRange.toString(),
      categories: _categories,
      brands: _brands.toString(),
    };
    setSortOrder(e.target.value);
    dispatch(fetchFilteredProducts(params));
  };

  const handlePageChange = () => {
    const _categories = categories?.value;
    const _brands = brands.map((entry) => entry.value);
    const params = {
      query,
      order: sortOrder,
      price: priceRange.toString(),
      categories: _categories,
      brands: _brands.toString(),
      page,
      limit,
    };
    dispatch(fetchFilteredProducts(params));
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
    if (data.length === 0 && status === "idle") {
      dispatch(fetchFilteredProducts({}));
    }
  }, []);

  return (
    <Layout>
      <div className="container sm:py-12 py-6">
        <div className="flex sm:flex-row flex-col gap-8 relative">
          <ProductFilters />

          <div className="flex flex-col gap-6 flex-1 p-3">
            <div className="flex flex-row justify-between items-center">
              <h2 className="heading3">Shop</h2>
              <OrderFilter
                sortOrder={sortOrder}
                handleOrderChange={handleOrderChange}
              />
            </div>
            <div className="grid-list-3 w-full">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : data.length === 0 ? (
                <p>No product found</p>
              ) : (
                data.map((entry, key) => <ProductCard key={key} data={entry} />)
              )}
            </div>

            <Pagination
              page={page}
              limit={limit}
              total={totalProducts}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
