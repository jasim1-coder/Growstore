import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../../common/starRating/StarRating";
import RatingSummary from "./RatingSummary";

const RatingCard = () => {
  const { id } = useParams(); // Get product ID from URL
  const [ratingData, setRatingData] = useState(null);

  const calculateRatingData = (reviews) => {
    const total = reviews.length;
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    reviews.forEach((review) => {
      const r = Math.round(review.rating);
      if (r >= 1 && r <= 5) {
        ratingCounts[r]++;
        sum += r;
      }
    });

    const averageRating = total > 0 ? (sum / total).toFixed(1) : 0;

    // Convert ratingCounts object to an array for RatingSummary
    const ratingArray = Object.entries(ratingCounts).map(([key, count]) => ({
      id: Number(key),
      count,
    })).sort((a, b) => b.id - a.id); // Sort descending by star rating

    return {
      averageRating: Number(averageRating),
      total,
      ratings: ratingArray,
    };
  };

  const getRatingsData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/products?_id=${id}`);
      const product = res.data[0]; // Access the first item from array

      if (product?.reviews?.length > 0) {
        const calculated = calculateRatingData(product.reviews);
        setRatingData(calculated);
      } else {
        setRatingData(null);
      }
    } catch (error) {
      console.error("Error fetching rating data:", error);
      setRatingData(null);
    }
  };

  useEffect(() => {
    getRatingsData();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 p-6 border border-greyLight">
      <h4 className="font-medium text-[20px]">Rating</h4>
      {ratingData ? (
        <>
          <div className="flex sm:flex-row flex-col sm:gap-3 gap-1 pb-4 sm:items-center border-b border-b-greyLight">
            <StarRating rating={ratingData.averageRating} />
            <span className="text-textDim text-sm">
              Based on {ratingData.total} reviews
            </span>
          </div>
          <RatingSummary data={ratingData.ratings} total={ratingData.total} />
        </>
      ) : (
        <span className="text-textDim text-sm">No Rating Available</span>
      )}
    </div>
  );
};

export default RatingCard;
