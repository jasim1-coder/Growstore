import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../common/pagination/Pagination";
import AddReviewCard from "./AddReviewCard";
import RatingCard from "./RatingCard";
import ReviewCard from "./ReviewCard";
import {
  reviewsFieldData,
  reviewsSortOrderData,
} from "../../../utils/DefaultValues";

const ProductReviews = ({ productData }) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [field, setField] = useState("date");
  const [order, setOrder] = useState("desc");

const getReviews = async (page, limit, sortField, orderField) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/products/${productData.id}`
    );

    const allReviews = data.reviews || [];

    // Sort
    allReviews.sort((a, b) => {
      if (orderField === "asc") return a[sortField] > b[sortField] ? 1 : -1;
      return a[sortField] < b[sortField] ? 1 : -1;
    });

    // Paginate
    const start = (page - 1) * limit;
    const paginatedReviews = allReviews.slice(start, start + limit);

    setReviewsData(paginatedReviews);
    setPageCount(Math.ceil(allReviews.length / limit));
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
};


  useEffect(() => {
    if (productData?.id) {
      getReviews(page, 10, field, order);
    }
  }, [page, field, order, productData]);
console.log("reviewsData:",productData)
  return (
    <div className="flex flex-col gap-4">
      <h3 className="heading3">Reviews for this product</h3>
      <div className="flex sm:flex-row flex-col justify-between sm:gap-12 gap-6 relative">
        <div className="sm:sticky sm:top-24 h-max">
          <RatingCard />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <AddReviewCard />
          {reviewsData.length === 0 ? (
            <p className="text-uiBlack font-medium">No reviews found</p>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3 self-end">
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="cursor-pointer bg-greyLight border border-uiGrey text-uiBlack px-2 rounded-sm"
                >
                  {reviewsFieldData.map(({ title, value }) => (
                    <option value={value} key={value}>
                      {title}
                    </option>
                  ))}
                </select>

                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="cursor-pointer bg-greyLight border border-uiGrey text-uiBlack px-2 rounded-sm"
                >
                  {reviewsSortOrderData.map(({ title, value }) => (
                    <option value={value} key={value}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-6">
                {reviewsData.map((entry, key) => (
                  <ReviewCard data={entry} key={key} />
                ))}
              </div>
              <Pagination
                page={page}
                limit={10}
                total={pageCount}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
