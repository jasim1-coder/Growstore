import React, { useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import CategoriesItem from "./CategoriesItem";
import { product } from "../../../assets";

const data = [
  {
    _id: "anbc",
    imageUrl: product,
    title: "Category 1",
    count: "20",
  },
  {
    _id: "anbcd",
    imageUrl: product,
    title: "Category 2",
    count: "20",
  },
  {
    _id: "dfa",
    imageUrl: product,
    title: "Category 3",
    count: "20",
  },
];

const CategoriesList = () => {
  const pageSize = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const len = data?.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid-list-5 w-full">
        {data.length === 0 ? (
          <p>No Categories found</p>
        ) : (
          data.map((entry) => <CategoriesItem key={entry._id} data={entry} />)
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

export default CategoriesList;
