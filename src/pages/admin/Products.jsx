import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import ProductsList from "../../components/admin/products/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  getAdminProductsData,
  getAdminProductsNameQuery,
} from "../../redux/adminSlice/productsSlice";
import AdminSearchBar from "../../components/admin/commons/AdminSearchBar";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const productsData = useSelector(getAdminProductsData);
  const _nameQuery = useSelector(getAdminProductsNameQuery);

  const [nameQuery, setNameQuery] = useState(_nameQuery);

  const handleSearch = (e) => {
    setNameQuery(e.target.value);
    const params = {
      nameQuery: e.target.value,
    };
    dispatch(fetchAdminProducts(params));
  };

  useEffect(() => {
    if (productsData.length === 0) {
      const params = {
        nameQuery: _nameQuery,
      };
      dispatch(fetchAdminProducts(params));
    }
  }, []);

  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Products" />

        <section className="adminMainContainer">
          <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center gap-4">
            <h4 className="heading4">Product List</h4>
            <AdminSearchBar
              value={nameQuery}
              onChange={handleSearch}
              placeholder="Search by title..."
            />
          </div>
          <ProductsList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
