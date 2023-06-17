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
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

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
        <div className="flex flex-row items-center justify-between">
          <AdminPageHeader title="Products" />
          <Link
            to="/admin/products/add"
            className="pl-4 pr-6 py-2 flex flex-row items-center gap-2 border border-baseGreen bg-baseGreen hover:bg-darkGreen text-uiWhite duration-150 transition-all font-medium rounded-sm"
          >
            <FiPlus className="text-[18px]" />
            <span className="">New Product</span>
          </Link>
        </div>

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
