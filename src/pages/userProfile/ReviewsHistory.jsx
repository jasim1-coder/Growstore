import React from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import ReviewsList from "../../components/profile/reviews/ReviewsList";

const ReviewsHistory = () => {
  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="">
          <h2 className="heading2">My Reviews</h2>
          <span className="text-sm text-textDim">
            Here you can view all your reviews.
          </span>
        </div>
        <ReviewsList />
      </section>
    </ProfileLayout>
  );
};

export default ReviewsHistory;
