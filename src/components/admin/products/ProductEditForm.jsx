import React from "react";
import { useEffect } from "react";
import { FiXCircle } from "react-icons/fi";
import { useState } from "react";
import ConfirmBox from "../commons/ConfirmBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAdmin,
  getAdminDeleteProductError,
  getAdminDeleteProductStatus,
  getAdminUpdateProductError,
  getAdminUpdateProductStatus,
  removeAdminDeleteProductStatus,
  updateProductAdmin,
} from "../../../redux/adminSlice/productsSlice";
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";
import ProductForm from "./ProductForm";

const ProductEditForm = ({ data, showForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const deleteStatus = useSelector(getAdminDeleteProductStatus);
  const deleteError = useSelector(getAdminDeleteProductError);

  const updateStatus = useSelector(getAdminUpdateProductStatus);
  const updateError = useSelector(getAdminUpdateProductError);

  const [showBox, setShowBox] = useState(false);

  const handleDelete = async () => {
    setShowBox(false);
    try {
      await dispatch(deleteProductAdmin(id)).unwrap();
      navigate("/admin/products", { replace: true });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const handleProductEdit = async (values) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        if (
          value === "images" ||
          value === "imageURLHighRes" ||
          value === "category"
        ) {
          for (let _entry of values[value]) {
            formData.append(value, _entry);
          }
        } else {
          formData.append(value, values[value]);
        }
      }
      const _data = { id, data: formData };
      await dispatch(updateProductAdmin(_data)).unwrap();
      showForm(false);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="overlayContainer" id="edit-product">
      <div className="relative">
        <div
          className="overlayBackdrop absolute"
          onClick={() => showForm(false)}
        />
        {deleteStatus === "failed" ? (
          <AlertBox
            message={deleteError}
            type={deleteStatus}
            toDispatch={removeAdminDeleteProductStatus}
          />
        ) : null}

        {updateStatus === "failed" ? (
          <AlertBox
            message={updateError}
            type={updateStatus}
            toDispatch={removeAdminDeleteProductStatus}
          />
        ) : null}

        <div className="flex items-center justify-center w-full min-h-full sm:p-12 p-4">
          <div className="flex flex-col gap-4 bg-white z-20 sm:w-[70%] h-full p-8 rounded-sm shadow-md sm:ml-[220px] relative">
            {deleteStatus == "loading" || updateStatus === "loading" ? (
              <SimpleLoading />
            ) : null}
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="heading2">Edit product</h2>
              <button
                type="button"
                onClick={() => setShowBox(true)}
                className="hover:text-uiWhite text-uiRed border-uiRed hover:bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
              >
                <FiXCircle />
                <span className="text-sm">Delete Product</span>
              </button>
            </div>

            <ProductForm
              handleCancel={() => showForm(false)}
              handleSubmit={handleProductEdit}
              initialValues={data}
            />
            {showBox && (
              <ConfirmBox
                onConfirm={handleDelete}
                setShowBox={setShowBox}
                message="Delete Product"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;
