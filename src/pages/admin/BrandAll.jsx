import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/pageHeaders";

const BrandAll = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Brands" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="heading3">Brands List</h3>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default BrandAll;
