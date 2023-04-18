import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import CategoriesList from "../../components/admin/categories/CategoriesList";
import {
  fetchAdminCategories,
  getAdminCategoriesData,
  getAdminCategoriesSearchQuery,
  getAdminCategoriesSortOrder,
} from "../../redux/adminSlice/categoriesSlice";
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

const AdminCategories = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(getAdminCategoriesData);
  const _searchQuery = useSelector(getAdminCategoriesSearchQuery);
  const _sortOrder = useSelector(getAdminCategoriesSortOrder);

  const [searchQuery, setSearchQuery] = useState(_searchQuery);
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const params = {
      searchQuery: e.target.value,
    };
    dispatch(fetchAdminCategories(params));
  };

  const handleSort = (e) => {
    const params = {
      searchQuery: searchQuery,
      sortOrder: e.target.value,
    };
    dispatch(fetchAdminCategories(params));
  };

  useEffect(() => {
    if (categoriesData.length === 0) {
      const params = {
        searchQuery: _searchQuery,
      };
      dispatch(fetchAdminCategories(params));
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
        <AdminPageHeader title="Categories" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Category List</h4>
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
                placeholder="Search by category..."
              />
            </div>
          </div>
          <CategoriesList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
