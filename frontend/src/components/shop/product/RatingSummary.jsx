import React from "react";

const RatingSummary = ({ data, total }) => {
  const getRatingPercentage = (value) => {
    const percent = 100 * (value / total);
    return parseFloat(percent.toFixed(2));
  };
  return (
    <div className="flex flex-col sm:gap-3 gap-5">
      {data.map((entry) => {
        const percentage = getRatingPercentage(entry.count);

        return (
          <div
            className="flex sm:flex-row sm:gap-6 sm:items-center flex-col gap-2"
            key={entry.id}
          >
            <span className="">{entry.id} star</span>
            <div className="h-[24px] w-[250px] rounded-sm bg-greyLight">
              <div
                className="h-full bg-baseGreen"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
            <p className="flex flex-row gap-2">
              <span className="">{percentage}%</span>
              <span className="text-sm text-textDim">
                ({entry.count} reviews)
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RatingSummary;
