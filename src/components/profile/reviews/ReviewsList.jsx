import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Pagination from "../../common/pagination/Pagination";
import { PRIVATE_API } from "../../../api/apiIndex";

const ReviewsList = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getReviews = async (page, limit) => {
    const { data } = await PRIVATE_API.get(
      `/review/byuser/?page=${page}&limit=${limit}`
    );
    console.log(data);
    setReviewsData(data.data);
    setPageCount(data.count);
  };

  useEffect(() => {
    getReviews(page, 10);
  }, [page]);

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
