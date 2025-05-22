import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import {
  fetchAdminSingleProduct,
  getAdminSingleProductData,
  getAdminSingleProductFetchError,
  getAdminSingleProductFetchStatus,
  removeAdminSingleProduct,
} from "../../redux/adminSlice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AlertBox from "../../components/common/AlertBox";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import ProductMetadata from "../../components/admin/products/ProductMetadata";
import ProductReviewsHistory from "../../components/admin/products/ProductReviewsHistory";
// import ProductAnalysis from "../../components/admin/products/ProductAnalysis";

const AdminManageProducts = () => {
  const dispatch = useDispatch();
  const {id}= useParams();
  console.log("id",id)
  const data = useSelector(getAdminSingleProductData);
  const status = useSelector(getAdminSingleProductFetchStatus);
  const error = useSelector(getAdminSingleProductFetchError);

useEffect(() => {
  dispatch(fetchAdminSingleProduct(id));
}, [id, dispatch]);

// Log the data after the fetch action is dispatched
useEffect(() => {
  console.log("Updated single data:", data);  // This will log when 'data' changes
}, [data,id,dispatch]);
 // Include 'data' in the dependency array to log the latest state

  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}

      <div className="adminContainer">
        <AdminPageHeader title="Manage Product" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/products" />
            {data.quantity <= 0 ? (
              <span className="text-red-500 font-medium rounded-sm border border-red-500 py-1 px-2">
                Out of stock
              </span>
            ) : data.quantity < 10 ? (
              <span className="text-yellow-600 font-medium rounded-sm border border-yellow-500 py-1 px-2">
                Low in stock
              </span>
            ) : (
              <span className="text-green-500 font-medium rounded-sm border border-green-500 py-1 px-2">
                In Stock
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            {status === "loading" ? (
              <div className="w-full">
                <SimpleLoading />
              </div>
            ) : null}
            {/* <ProductAnalysis /> */}
            <ProductMetadata />
            <ProductReviewsHistory />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageProducts;
