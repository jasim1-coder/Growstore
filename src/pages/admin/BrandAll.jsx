import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import BrandsList from "../../components/admin/brands/BrandsList";
import {
  fetchAdminBrands,
  getAdminBrandsData,
  getAdminBrandsSearchQuery,
  getAdminBrandsSortOrder,
} from "../../redux/adminSlice/brandsSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminSearchBar from "../../components/admin/commons/AdminSearchBar";

const orderData = [
  {
    title: "Title - Z to A",
    value: JSON.stringify({ title: -1 }),
  },
  {
    title: "Title - A to Z",
    value: JSON.stringify({ title: 1 }),
  },
  {
    title: "Items - High to low",
    value: JSON.stringify({ count: -1 }),
  },
  {
    title: "Items - Low to high",
    value: JSON.stringify({ count: 1 }),
  },
];

const AdminBrands = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(getAdminBrandsData);
  const _searchQuery = useSelector(getAdminBrandsSearchQuery);
  const _sortOrder = useSelector(getAdminBrandsSortOrder);

  const [searchQuery, setSearchQuery] = useState(_searchQuery);
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const params = {
      searchQuery: e.target.value,
    };
    dispatch(fetchAdminBrands(params));
  };

  const handleSort = (e) => {
    const params = {
      searchQuery: searchQuery,
      sortOrder: e.target.value,
    };
    dispatch(fetchAdminBrands(params));
  };

  useEffect(() => {
    if (usersData.length === 0) {
      const params = {
        searchQuery: _searchQuery,
      };
      dispatch(fetchAdminBrands(params));
    }
  }, []);

  useEffect(() => {
    if (_sortOrder) {
      setSortOrder(_sortOrder);
    } else {
      setSortOrder("");
    }
  }, [_sortOrder]);

  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Brands" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Brands List</h4>
            <div className="flex flex-row items-center gap-4">
              <select
                value={sortOrder}
                onChange={handleSort}
                className="cursor-pointer text-uiBlack px-2 rounded-sm text-sm focus:outline-none border border-greyLight py-1"
              >
                <option value="">Featured</option>
                {orderData.map(({ title, value }) => (
                  <option value={value} key={value}>
                    {title}
                  </option>
                ))}
              </select>

              <AdminSearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by brand..."
              />
            </div>
          </div>
          <BrandsList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminBrands;
