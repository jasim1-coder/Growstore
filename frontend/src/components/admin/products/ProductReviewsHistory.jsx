import React from "react";
import RatingCard from "../../shop/product/RatingCard";
import { FaRegUserCircle } from "react-icons/fa";
import StarRating from "../../common/starRating/StarRating";
import moment from "moment";
import {
  reviewsFieldData,
  reviewsSortOrderData,
} from "../../../utils/DefaultValues";
import { useState, useEffect } from "react";
import Pagination from "../../common/pagination/Pagination";
import { useParams } from "react-router-dom";

const ReviewCard = ({ data }) => {
  const date = moment(data.Time).format("MMMM DD, YYYY");
  return (
    <div className="border border-greyLight p-4 flex flex-col">
      <div className="flex flex-row gap-5 items-center border-b border-b-greyLight pb-2">
        <div className="flex flex-row gap-3">
          <FaRegUserCircle className="text-[22px] text-textDim" />
          <span className="text-sm text-uiBlack">{data.reviewerName}</span>
        </div>
        <span className="text-xs text-textDim">{date}</span>
      </div>
      <div className="pt-2 flex flex-col gap-2">
        <StarRating rating={data.Rating} />
        <p className="text-bodyText text-[13px]">{data.reviewText}</p>
      </div>
    </div>
  );
};

const ProductReviewsByUser = () => {
  const id = useParams().id;
  const [reviewsData, setReviewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [field, setField] = useState("Rating");
  const [order, setOrder] = useState("DESC");

  const getReviews = async (page, limit, sortField, orderField) => {
    try {
      const response = await fetch(`http://localhost:3001/products/?&_id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");

      const product = await response.json();
      let reviews = product[0].reviews || [];
      console.log("admin product reviews :",product[0].reviews)

      // Normalize keys for consistent sorting & display
      reviews = reviews.map((review) => ({
        ...review,
        Rating: review.Rating ?? review.rating,
        Time: review.Time ?? review.date,
        reviewerName: review.reviewerName ?? review.username,
        reviewText: review.reviewText ?? review.comment,
      }));

      // Sort reviews by field and order
      reviews.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA === undefined || valB === undefined) return 0;

        if (orderField.toLowerCase() === "asc") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });

      // Pagination
      const start = (page - 1) * limit;
      const paginated = reviews.slice(start, start + limit);

      setReviewsData(paginated);
      setPageCount(reviews.length);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsData([]);
      setPageCount(0);
    }
  };

  useEffect(() => {
    getReviews(page, 10, field, order);
  }, [page, field, order]);

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between pb-3 border-b border-b-greyLight">
          <h4 className="heading4">Product Reviews History</h4>
          <div className="flex flex-row gap-3 self-end">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="cursor-pointer border border-uiGrey text-uiBlack px-2 rounded-sm text-sm"
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
              className="cursor-pointer border border-uiGrey text-uiBlack px-2 rounded-sm text-sm"
            >
              {reviewsSortOrderData.map(({ title, value }) => (
                <option value={value} key={value}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {reviewsData.length === 0 ? (
          <p className="text-uiBlack font-medium">No reviews found</p>
        ) : (
          <>
            <div className="flex flex-col gap-2">
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
          </>
        )}
      </div>
    </div>
  );
};

const ProductReviewsHistory = () => {
  return (
    <div className="flex flex-col gap-6">
      <RatingCard />

      <ProductReviewsByUser />
    </div>
  );
};

export default ProductReviewsHistory;
