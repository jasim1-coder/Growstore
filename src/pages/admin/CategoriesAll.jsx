import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/pageHeaders";

const CategoriesAll = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Categories" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="heading3">Category List</h3>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default CategoriesAll;
