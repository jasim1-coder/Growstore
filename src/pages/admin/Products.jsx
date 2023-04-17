import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import ProductsList from "../../components/admin/products/ProductsList";

const AdminProducts = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Products" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Product List</h4>
          </div>
          <ProductsList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
