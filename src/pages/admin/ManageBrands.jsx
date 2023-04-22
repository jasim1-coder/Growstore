import React, { useEffect } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import { useDispatch, useSelector } from "react-redux";
import BrandMetadata from "../../components/admin/brands/BrandMetadata";
import BrandProduct from "../../components/admin/brands/BrandProduct";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import AlertBox from "../../components/common/AlertBox";
import { useParams } from "react-router-dom";
import {
  fetchAdminSingleBrand,
  getAdminSingleBrandEditError,
  getAdminSingleBrandEditStatus,
  getAdminSingleBrandFetchError,
  getAdminSingleBrandFetchStatus,
  removeAdminSingleBrand,
} from "../../redux/adminSlice/brandsSlice";

const AdminManageBrands = () => {
  const id = useParams().id;

  const dispatch = useDispatch();

  const status = useSelector(getAdminSingleBrandFetchStatus);
  const error = useSelector(getAdminSingleBrandFetchError);

  const editStatus = useSelector(getAdminSingleBrandEditStatus);
  const editError = useSelector(getAdminSingleBrandEditError);

  useEffect(() => {
    dispatch(fetchAdminSingleBrand(id));

    return () => {
      dispatch(removeAdminSingleBrand());
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
        <AdminPageHeader title="Manage Brand" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/categories" />
          </div>
          <div className="flex flex-col relative gap-6">
            {status === "loading" || editStatus === "loading" ? (
              <div className="w-full">
                <SimpleLoading />
              </div>
            ) : null}

            <BrandMetadata id={id} />
            <BrandProduct id={id} />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageBrands;
