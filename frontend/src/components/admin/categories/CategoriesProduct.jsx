import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../../utils/FormatCurrency";
import Pagination from "../../common/pagination/Pagination";
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";

const ProductItem = ({ entry }) => {
  const navigate = useNavigate();

  const handleProductNavigation = () => {
    navigate(`/admin/products/${entry.id}`);
  };

  return (
    <tr
      className="border hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleProductNavigation}
    >
      <td className="px-2 py-4 overflow-clip flex flex-row items-center gap-2 text-bodyText">
        <img
          src={entry.imageUrl}
          className="h-[50px] w-[50px] object-contain"
          alt={entry.title}
        />
        <span
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: entry.title }}
        />
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{formatCurrency(entry.price)}</span>
      </td>
      <td className="px-2 py-4 overflow-clip whitespace-nowrap">
        <span>{entry.quantity}</span>
      </td>
    </tr>
  );
};

const CategoriesProduct = ({ id }) => {
  const limit = 10;
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setStatus("loading");
      const response = await axios.get(`http://localhost:3001/categories/${id}`);
      const category = response.data;
      setCategoryName(category.name);
      setProducts(category.products || []);
      setStatus("success");
    } catch (err) {
      setStatus("failed");
      setError(err?.response?.data?.message || err.message || "Error fetching category data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Pagination logic
  const total = products.length;
  const startIndex = (currentPage - 1) * limit;
  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  return (
    <div className="flex flex-col">
      {status === "failed" && <AlertBox message={error} type={status} />}
      <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
        <h4 className="heading4">Products in "{categoryName}"</h4>
        <span className="text-textDim text-sm">Total: {total}</span>
      </div>

      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto pt-3">
        <table className="w-full text-left">
          <thead className="text-sm font-normal">
            <tr className="border-b p-2 border text-textDim">
              <td className="p-2">Product</td>
              <td className="p-2">Price</td>
              <td className="p-2">Stock</td>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan={3} className="p-4">
                  <SimpleLoading />
                </td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr className="text-center">
                <td colSpan="3" className="text-center px-2 py-4">
                  No items found for this category
                </td>
              </tr>
            ) : (
              paginatedProducts.map((entry) => (
                <ProductItem key={entry.id} entry={entry} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={currentPage}
        limit={limit}
        total={total}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default CategoriesProduct;
