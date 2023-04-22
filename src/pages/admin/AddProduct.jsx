import React from "react";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminLayout from "../../components/common/AdminLayout";
import ProductForm from "../../components/admin/products/ProductForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PRIVATE_API } from "../../api/apiIndex";
import AlertBox from "../../components/common/AlertBox";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";

const initialValues = {
  title: "",
  brand: "",
  category: [],
  price: null,
  MRP: null,
  quantity: null,
  feature: "",
  description: "",
  images: [],
};

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleCancel = () => {
    navigate("/admin/products");
  };
  const handleAddProduct = async (values, { resetForm }) => {
    try {
      setStatus("loading");
      const formData = new FormData();
      for (let value in values) {
        if (value === "category") {
          for (let _entry of values[value]) {
            formData.append(value, _entry.value);
          }
        } else if (value === "brand") {
          formData.append(value, values[value].value);
        } else if (value === "images") {
          for (let _entry of values[value]) {
            formData.append(value, _entry);
          }
        } else {
          formData.append(value, values[value]);
        }
      }
      const { data } = await PRIVATE_API.post("/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);

      setStatus("success");
      resetForm({ values: initialValues });
    } catch (err) {
      setStatus("failed");
      setError(err.response ? err.response.data.message : err);
    }
  };
  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      {status == "success" ? (
        <AlertBox message="Successfully added product" type={status} />
      ) : null}

      <div className="adminContainer">
        <AdminPageHeader title="Add Product" />

        <section className="adminMainContainer relative">
          {status == "loading" ? <SimpleLoading /> : null}
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/products" />
          </div>
          <ProductForm
            handleSubmit={handleAddProduct}
            initialValues={initialValues}
            handleCancel={handleCancel}
          />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
