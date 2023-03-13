import React, { useState } from "react";

const ImageSection = ({ imageURL, imageURLHighRes }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-greyLight/60 border border-greyLight rounded-sm p-5 w-[500px]">
        <img
          src={imageURLHighRes[index]}
          className="h-[400px] max-w-auto object-contain m-auto"
        />
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {imageURL.map((entry, key) => (
          <button
            onClick={() => setIndex(key)}
            key={key}
            className={`h-[50px] w-[50px] bg-greyLight border ${
              key === index ? "border-baseGreen" : "border-greyLight"
            } rounded-sm p-2`}
          >
            <img
              src={entry}
              alt=""
              className="object-contain max-h-[50px] m-auto"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
