import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ImageSection from "../../components/shop/product/ImageSection";
import ProductMain from "../../components/shop/product/ProductMain";
import ProductRelated from "../../components/shop/product/ProductRelated";
import ProductReviews from "../../components/shop/product/ProductReviews";
import {
  clearProductDetails,
  fetchProductDetails,
  getProductDetails,
  getProductError,
  getProductStatus,
} from "../../redux/slice/productSlice";
import BackButton from "../../components/common/BackButton";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector(getProductDetails);
  const status = useSelector(getProductStatus);
  const error = useSelector(getProductError);

  useEffect(() => {
    dispatch(fetchProductDetails(id)); // fetch product based on the id
    localStorage.setItem("product", JSON.stringify(id)); // Save product ID to local storage for later use
    return () => {
      dispatch(clearProductDetails()); // Clear the product data on component unmount
      localStorage.removeItem("product"); // Clean up local storage
    };
  }, [id, dispatch]);

  // Debugging: Console log to check fetched product data
  useEffect(() => {
    console.log(productData); // You can check here to ensure `productData` is being populated correctly
  }, [productData]);

  return (
    <Layout>
      <div className="container sm:pb-12 pt-6 pb-6">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && productData ? (
  <div className="flex flex-col gap-[3rem]">
    <BackButton />
    <div className="flex sm:flex-row flex-col gap-8 justify-between">
<ImageSection
  imageURL={[productData.imageUrl]}
  imageURLHighRes={[productData.imageUrl]}
/>

      <ProductMain product={productData} />
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="heading3">Description</h3>
      <p className="text-bodyText text-sm">
        {productData.description || "No description available."}
      </p>
    </div>

    {productData.relatedProducts?.length > 0 && <ProductRelated />}
    {productData.reviews?.length > 0 && <ProductReviews />}
  </div>
) : null}
      </div>
    </Layout>
  );
};

export default Product;
