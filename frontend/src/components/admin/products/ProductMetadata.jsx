import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProductEditForm from "./ProductEditForm";
import { getAdminSingleProductData } from "../../../redux/adminSlice/productsSlice";
import { formatCurrency } from "../../../utils/FormatCurrency";

const ProductMetadata = () => {
  const data = useSelector(getAdminSingleProductData) || {};
  const [editActive, setEditActive] = useState(false);

  const brandLabel =
    typeof data.brand === "string"
      ? data.brand
      : data?.brand?.label || "Unknown Brand";

  const categories =
    Array.isArray(data.category) && data.category.length > 0
      ? data.category
      : [];

  const images = Array.isArray(data.imageURLHighRes)
    ? data.imageURLHighRes
    : [];

  return (
    <div className="flex flex-col mb-6">
      <div className="pb-3 border-b border-b-greyLight flex flex-row justify-between items-center">
        <h4 className="heading4">Product Metadata</h4>
        <button
          type="button"
          onClick={() => setEditActive(true)}
          className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
        >
          <FiEdit />
          <span className="text-sm">Edit</span>
        </button>
      </div>

      {/* Title */}
      <div className="mt-3 p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Title</span>
        <span>{data?.title || "N/A"}</span>
      </div>

      {/* Brand and Category */}
      <div className="p-3 flex flex-row justify-between flex-wrap border border-greyLight">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Brand</span>
          <span>{brandLabel}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Categories</span>
          <div className="flex flex-row">
            {categories.length > 0 ? (
              categories.map((entry, i) => (
                <span
                  key={entry.value || entry}
                  className={`${
                    i !== categories.length - 1 ? "border-r border-r-bodyText" : ""
                  } first:px-0 first:pr-2 px-2`}
                >
                  {entry.label || entry}
                </span>
              ))
            ) : (
              <span>No category info</span>
            )}
          </div>
        </div>
      </div>

      {/* Price, MRP, Stock, Rating, Reviews */}
      <div className="p-3 grid-list-5 border border-greyLight">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Price</span>
          <span>{formatCurrency(data?.price ?? 0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">MRP</span>
          <span>{formatCurrency(data?.MRP ?? 0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Stock</span>
          <span>{data?.quantity ?? 0} Items</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Rating</span>
          {data?.rating ? (
            <div className="flex flex-row gap-2 items-center">
              <span>{data.rating}</span>
              <FaStar className="text-yellow-400" />
            </div>
          ) : (
            "No rating"
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Reviews</span>
          <span>{data?.totalReviews ?? 0}</span>
        </div>
      </div>

      {/* Feature */}
      <div className="p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Feature</span>
        <span>{data?.feature || "No feature info"}</span>
      </div>

      {/* Description */}
      <div className="p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Description</span>
        <span>{data?.description || "No description available"}</span>
      </div>

      {/* Images */}
      <div className="flex flex-col gap-2 p-3 border border-greyLight">
        <span className="text-sm text-textDim">Images</span>
        <div className="grid-list-5">
          {images.length > 0 ? (
            images.map((imageUrl) => (
              <div
                key={imageUrl}
                className="w-full max-h-[200px] bg-greyLight flex justify-center items-center"
              >
                <img
                  src={imageUrl}
                  alt="Product"
                  className="object-contain w-full max-h-full min-h-[150px]"
                />
              </div>
            ))
          ) : (
            <span>No images available</span>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editActive && (
        <ProductEditForm
          showForm={setEditActive}
          data={{
            title: data?.title || "",
            brand: data?.brand || "",
            category: data?.category || [],
            price: data?.price ?? 0,
            MRP: data?.MRP ?? 0,
            quantity: data?.quantity ?? 0,
            feature: data?.feature || "",
            description: data?.description || "",
            imageURLHighRes: images,
            images: [],
          }}
        />
      )}
    </div>
  );
};

export default ProductMetadata;
