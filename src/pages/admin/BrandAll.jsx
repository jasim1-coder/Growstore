import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import BrandsList from "../../components/admin/brands/BrandsList";

const AdminBrands = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Brands" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Brands List</h4>
          </div>
          <BrandsList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminBrands;
