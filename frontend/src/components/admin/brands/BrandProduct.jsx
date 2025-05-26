import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { fetchProductsByBrand, getAdminSingleBrandData } from "../../../redux/adminSlice/brandsSlice";
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
      <td className="px-2 py-4 flex items-center gap-2">
        <img src={entry.imageUrl} alt={entry.title} className="h-[50px] w-[50px] object-contain" />
        <span className="text-sm" dangerouslySetInnerHTML={{ __html: entry.title }} />
      </td>
      <td className="px-2 py-4">
        <span>{formatCurrency(entry.price)}</span>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <span>{entry.quantity}</span>
      </td>
    </tr>
  );
};

const BrandProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandData = useSelector(getAdminSingleBrandData) || {};
  const brand = brandData.name || "";

  const products = useSelector((state) => state.adminBrands.products);
  const fetchProdStatus = useSelector((state) => state.adminBrands.fetchProdStatus);
  const fetchProdError = useSelector((state) => state.adminBrands.fetchProdError);
  const total = useSelector((state) => state.adminBrands.totalBrands);

  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (brand) {
      dispatch(fetchProductsByBrand(brand));
    }
  }, [dispatch, brand]);

  return (
    <div className="flex flex-col">
      {fetchProdStatus === "failed" && <AlertBox message={fetchProdError} type="failed" />}
      <div className="pb-3 border-b border-b-greyLight flex justify-between items-center">
        <h4 className="heading4">Products</h4>
        <span className="text-textDim text-sm">Total: {total}</span>
      </div>

      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto pt-3">
        <table className="w-full text-left">
          <thead className="text-sm font-normal">
            <tr className="border-b border text-textDim">
              <td className="p-2">Product</td>
              <td className="p-2">Price</td>
              <td className="p-2">Stock</td>
            </tr>
          </thead>
          <tbody>
            {fetchProdStatus === "loading" ? (
              <tr>
                <td colSpan={3} className="p-4">
                  <SimpleLoading />
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center px-2 py-4">
                  No items found for this brand
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
