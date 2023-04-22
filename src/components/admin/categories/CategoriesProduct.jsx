import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { useState } from "react";
import { PRIVATE_API } from "../../../api/apiIndex";
import Pagination from "../../common/pagination/Pagination";
import AlertBox from "../../common/AlertBox";
import { ImSpinner8 } from "react-icons/im";

const ProductItem = ({ entry }) => {
  const navigate = useNavigate();

  const handleProductNavigation = () => {
    navigate(`/admin/products/${entry._id}`);
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
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setStatus("loading");
      const { data } = await PRIVATE_API.get(`/category/products/${id}`, {
        params: {
          page: currentPage,
          limit: limit,
        },
      });
      setTotal(data.total);
      setData(data.data);
      setStatus("success");
    } catch (err) {
      setStatus("failed");
      setError(err.response ? err.response.data.message : err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
        <h4 className="heading4">Products</h4>
        <span className="text-textDim text-sm">Total: {total}</span>
      </div>
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto pt-3">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm font-normal">
            <tr className="border-b p-2 border text-textDim">
              <td className="p-2">Product</td>
              <td className="p-2">Price</td>
              <td className="p-2">Stock</td>
            </tr>
          </thead>
          <tbody className="relative h-full w-full">
            {status === "loading" ? (
              <tr>
                <td colSpan={5}>
                  <div className="absolute top-0 left-0 w-full h-full bg-greyLight/50">
                    <div className="flex w-full h-full justify-center items-center">
                      <ImSpinner8 className="text-[66px] animate-spin text-uiBlue" />
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
            {!data || data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="text-center px-2 py-4">
                  No items found for this category
                </td>
              </tr>
            ) : (
              data.map((entry) => <ProductItem key={entry._id} entry={entry} />)
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
