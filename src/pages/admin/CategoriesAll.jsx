import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import CategoriesList from "../../components/admin/categories/CategoriesList";

const AdminCategories = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Categories" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Category List</h4>
          </div>
          <CategoriesList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
