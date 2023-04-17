import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/pageHeaders";

const Products = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Products" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="heading3">Product List</h3>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Products;
