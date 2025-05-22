import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByBrand } from "../../../redux/adminSlice/brandsSlice";
import Pagination from "../../common/pagination/Pagination";
import AlertBox from "../../common/AlertBox";
import SimpleLoading from "../../common/loaders/SimpleLoading";

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

const BrandProduct = ({ id }) => {
  const dispatch = useDispatch();

  // Get products, loading status, and error from Redux store
  const products = useSelector((state) => state.adminBrands.products);
  const fetchProdStatus = useSelector((state) => state.adminBrands.fetchProdStatus);
  const fetchProdError = useSelector((state) => state.adminBrands.fetchProdError);
  const total = useSelector((state) => state.adminBrands.totalBrands); // Assuming total is managed in your state

  const limit = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Fetch products on page change
  useEffect(() => {
    dispatch(fetchProductsByBrand(id)); // Dispatch the action to fetch products by brand
  }, [dispatch, id, currentPage]); // Dependency array includes currentPage

  return (
    <div className="flex flex-col">
      {fetchProdStatus === "failed" && <AlertBox message={fetchProdError} type="failed" />}
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
            {fetchProdStatus === "loading" ? (
              <tr>
                <td colSpan={5} className="p-4">
                  <SimpleLoading />
                </td>
              </tr>
            ) : null}
            {products.length === 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="text-center px-2 py-4">
                  No items found for this category
                </td>
              </tr>
            ) : (
              products.map((entry) => <ProductItem key={entry._id} entry={entry} />)
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

export default BrandProduct;
