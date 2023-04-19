import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ProductEditForm from "./ProductEditForm";
import { getAdminSingleProductData } from "../../../redux/adminSlice/productsSlice";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { FaStar } from "react-icons/fa";

const ProductMetadata = () => {
  const data = useSelector(getAdminSingleProductData);

  const [editActive, setEditActive] = useState(false);

  return (
    <div className="flex flex-col">
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
      <div className="mt-3 p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Title</span>
        <span className="">{data.title}</span>
      </div>

      <div className="p-3 flex flex-row justify-between flex-wrap border border-greyLight">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Brand</span>
          <span className="">{data.brand}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Categories</span>
          <div className="flex flex-row">
            {data?.category?.map((entry, i) => (
              <span
                className={`${
                  i !== data.category.length - 1
                    ? "border-r border-r-bodyText"
                    : null
                }  first:px-0 first:pr-2 px-2`}
                key={entry}
              >
                {entry}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 grid-list-5 border border-greyLight">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Price</span>
          <span className="">{formatCurrency(data.price)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">MRP</span>
          <span className="">{formatCurrency(data.MRP)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Stock</span>
          <span className="">{data.quantity} Items</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Rating</span>
          {data.rating ? (
            <div className="flex flex-row gap-2 items-center">
              <span className="">{data.rating}</span>{" "}
              <FaStar className="text-yellow-400" />
            </div>
          ) : (
            "No rating"
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Reviews</span>
          <span className="">{data.totalReviews}</span>
        </div>
      </div>

      <div className="p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Feature</span>
        <span className="">{data.feature}</span>
      </div>
      <div className="p-3 flex flex-col border border-greyLight">
        <span className="text-sm text-textDim">Description</span>
        <span className="">{data.description}</span>
      </div>

      <div className="flex flex-col gap-2 p-3 border border-greyLight">
        <span className="text-sm text-textDim">Images</span>
        <div className="grid-list-5">
          {data?.imageURLHighRes?.map((imageUrl) => (
            <div
              className="w-full max-h-[200px] bg-greyLight flex justify-center items-center"
              key={imageUrl}
            >
              <img
                src={imageUrl}
                alt=""
                className="object-contain w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {editActive && (
        <ProductEditForm
          showForm={setEditActive}
          data={{
            title: data.title,
            brand: data.brand,
            category: data.category,
            price: data.price,
            MRP: data.MRP,
            quantity: data.quantity,
            feature: data.feature,
            description: data.description,
            imageURLHighRes: data.imageURLHighRes,
            images: [],
          }}
        />
      )}
    </div>
  );
};

export default ProductMetadata;
