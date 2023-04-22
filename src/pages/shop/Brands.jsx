import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import Pagination from "../../components/common/pagination/Pagination";
import BrandCard from "../../components/shop/brands/BrandCard";
import BrandSearch from "../../components/shop/brands/BrandSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  getBrandsCurrentPage,
  getBrandsData,
  getBrandsError,
  getBrandsPageLimit,
  getBrandsSearchQuery,
  getBrandsStatus,
  getBrandsTotalLength,
} from "../../redux/slice/brandSlice";

const Brands = () => {
  const dispatch = useDispatch();

  const data = useSelector(getBrandsData);
  const query = useSelector(getBrandsSearchQuery);

  const status = useSelector(getBrandsStatus);
  const error = useSelector(getBrandsError);

  const _page = useSelector(getBrandsCurrentPage);
  const limit = useSelector(getBrandsPageLimit);
  const totalBrands = useSelector(getBrandsTotalLength);

  const [page, setPage] = useState(_page);

  const handlePageChange = () => {
    const params = {
      query,
      page,
      limit,
    };
    console.log(params);
    dispatch(fetchBrands(params));
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
      dispatch(fetchBrands({}));
    }
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col sm:gap-6 gap-4 sm:pt-6 sm:pb-12 py-6">
        <div className="self-end">
          <BrandSearch />
        </div>
        <div className="">
          <h2 className="heading2">Explore Brands</h2>
        </div>
        {status === "failed" ? (
          <p className="text-red-500">Error: {error}</p>
        ) : null}
        <div className="grid-list-5 w-full">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No Brands found</p>
          ) : (
            data.map((entry) => <BrandCard key={entry._id} data={entry} />)
          )}
        </div>

        <Pagination
          page={page}
          limit={limit}
          total={totalBrands}
          setPage={setPage}
        />
      </div>
    </Layout>
  );
};

export default Brands;
