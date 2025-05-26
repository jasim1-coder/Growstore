import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Pagination from "../../../common/pagination/Pagination";
import { useSelector } from "react-redux";
import { getUser } from "../../../../redux/slice/authSlice";

const ReviewsList = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const user = useSelector(getUser);
  const userId = user?.id;
  console.log("userId in the review",userId)

  const getReviews = async (page, limit) => {
    if (!userId) return; // Early exit if user isn't loaded

    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const products = await response.json();
      console.log("data for the review section:",products)

      // Step 1: Extract reviews by user from all products
      const allUserReviews = products.flatMap((product) =>
        (product.reviews || [])
          .filter((review) => review.userId === "U001")
          .map((review) => ({
            ...review,
            productName: product.title,
            productId: product._id,
          }))
      );

      // Step 2: Paginate manually
      const start = (page - 1) * limit;
      const paginated = allUserReviews.slice(start, start + limit);

      setReviewsData(paginated);
      setPageCount(allUserReviews.length);
    } catch (error) {
      console.error("Error loading reviews by user:", error);
      setReviewsData([]);
      setPageCount(0);
    }
  };

  useEffect(() => {
    if (userId) {
      getReviews(page, 10);
    }
  }, [userId, page]);

  return (
    <div className="flex flex-col gap-3">
      {reviewsData.map((entry, key) => (
        <ReviewCard key={key} data={entry} />
      ))}

      <Pagination page={page} limit={10} total={pageCount} setPage={setPage} />
    </div>
  );
};

export default ReviewsList;
