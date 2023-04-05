import moment from "moment";
import React from "react";
import StarRating from "../../common/starRating/StarRating";
import { Link } from "react-router-dom";

const ReviewCard = ({ data }) => {
  const date = moment(data.Time).format("MMMM DD, YYYY");

  return (
    <div className="border border-greyLight p-4 flex flex-col">
      <div className="flex flex-row gap-5 items-center border-b border-b-greyLight pb-4">
        <div className="flex flex-row gap-3">
          <Link
            to={`/product/${data.ProductID}`}
            className="font-medium text-uiBlack hover:text-uiOrange transition-all duration-150"
          >
            <span
              dangerouslySetInnerHTML={{
                __html:
                  data.title.length > 100
                    ? data.title.substring(0, 100) + "..."
                    : data.title,
              }}
            />
          </Link>
        </div>
        <span className="text-sm text-textDim">{date}</span>
      </div>
      <div className="pt-4 flex flex-col gap-4">
        <StarRating rating={data.Rating} />
        <p className="text-bodyText text-sm">{data.reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
