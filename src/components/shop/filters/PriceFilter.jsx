import React from "react";
import ReactSlider from "react-slider";

const PriceFilter = ({ priceRange, range, setRange }) => {
  const handleRange = (value) => {
    setRange(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-textDim text-sm">Price</span>
      <div className="my-2">
        <ReactSlider
          className="bg-baseGreen cursor-pointer text-uiWhite flex items-center"
          thumbClassName="border border-baseGreen h-[35px] w-[35px] bg-baseGreen text-[10px] rounded-full flex items-center justify-center zeh-0"
          value={range.length === 0 ? [0] : range}
          min={priceRange[0]}
          max={priceRange[1]}
          minDistance={200}
          step={200}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={handleRange}
          withTracks
        />
      </div>
    </div>
  );
};

export default PriceFilter;
