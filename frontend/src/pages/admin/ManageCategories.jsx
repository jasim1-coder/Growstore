import React, { useEffect } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import CategoriesProduct from "../../components/admin/categories/CategoriesProduct";
import { useParams } from "react-router-dom";
import CategoryMetaData from "../../components/admin/categories/CategoryMetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminSingleCategory,
  getAdminSingleCategoryEditError,
  getAdminSingleCategoryEditStatus,
  getAdminSingleCategoryFetchError,
  getAdminSingleCategoryFetchStatus,
  removeAdminSingleCategory,
} from "../../redux/adminSlice/categoriesSlice";
import AlertBox from "../../components/common/AlertBox";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";

const AdminManageCategories = () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const status = useSelector(getAdminSingleCategoryFetchStatus);
  const error = useSelector(getAdminSingleCategoryFetchError);

  const editStatus = useSelector(getAdminSingleCategoryEditStatus);
  const editError = useSelector(getAdminSingleCategoryEditError);

  useEffect(() => {
    dispatch(fetchAdminSingleCategory(id));

    return () => {
      dispatch(removeAdminSingleCategory());
    };
  }, []);

  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      {editStatus == "failed" ? (
        <AlertBox message={editError} type={editStatus} />
      ) : null}
      {editStatus == "success" ? (
        <AlertBox message="Updated Successfully" type={editStatus} />
      ) : null}

      <div className="adminContainer">
        <AdminPageHeader title="Manage Category" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/categories" />
          </div>
          <div className="flex flex-col relative">
            {status === "loading" || editStatus === "loading" ? (
              <div className="w-full">
                <SimpleLoading />
              </div>
            ) : null}

            <CategoryMetaData id={id} />
            <CategoriesProduct id={id} />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageCategories;
