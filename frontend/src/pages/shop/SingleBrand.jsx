import React, { useEffect } from "react";
import Layout from "../../components/common/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandProduct,
  getBrandName,
  getBrandProduct,
  getBrandProductError,
  getBrandProductStatus,
  removeBrandProductData,
} from "../../redux/slice/brandSlice";
import BrandSearch from "../../components/shop/brands/BrandSearch";
import ProductCard from "../../components/shop/product/ProductCard";
import BackButton from "../../components/common/BackButton";

const SingleBrand = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const data = useSelector(getBrandProduct);
  const brandName = useSelector(getBrandName);
  const status = useSelector(getBrandProductStatus);
  const error = useSelector(getBrandProductError);

  useEffect(() => {
    dispatch(fetchBrandProduct(id));
    return () => {
      dispatch(removeBrandProductData());
    };
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col sm:gap-6 gap-4 sm:pt-6 sm:pb-12 py-6">
        <div className="flex items-center justify-between">
          <BackButton />
          <BrandSearch />
        </div>
        <div className="">
          <h3 className="heading3">Products for "{brandName}" Brand </h3>
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

export default SingleBrand;
