import React, { useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import Brandsitem from "./Brandsitem";
import { product } from "../../../assets";

const data = [
  {
    _id: "anbc",
    imageUrl: product,
    title: "Brand 1",
    count: "20",
  },
  {
    _id: "anbcd",
    imageUrl: product,
    title: "Brand 2",
    count: "20",
  },
  {
    _id: "dfa",
    imageUrl: product,
    title: "Brand 3",
    count: "20",
  },
];

const BrandsList = () => {
  const pageSize = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const len = data?.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid-list-5 w-full">
        {data.length === 0 ? (
          <p>No Brands found</p>
        ) : (
          data.map((entry) => <Brandsitem key={entry._id} data={entry} />)
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={len}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BrandsList;
