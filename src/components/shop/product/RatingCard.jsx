import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NODE_API } from "../../../api/apiIndex";
import StarRating from "../../common/starRating/StarRating";
import RatingSummary from "./RatingSummary";

const RatingCard = () => {
  const id = useParams().id;
  const [data, setData] = useState("");

  const getRatingsData = async () => {
    const { data } = await NODE_API.get(`/review/rating/${id}`);
    setData(data.data);
  };

  useEffect(() => {
    getRatingsData();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-6 border border-greyLight">
      <h4 className="font-medium text-[20px]">Rating</h4>
      {data ? (
        <>
          <div className="flex sm:flex-row flex-col sm:gap-3 gap-1 pb-4 sm:items-center border-b border-b-greyLight">
            <StarRating rating={data.averageRating} />
            <span className="text-textDim text-sm">
              Based on {data.total} reviews
            </span>
          </div>
          <RatingSummary data={data.ratings} total={data.total} />
        </>
      ) : null}
    </div>
  );
};

export default RatingCard;
