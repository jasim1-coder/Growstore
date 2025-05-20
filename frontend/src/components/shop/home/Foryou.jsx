// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRecommendation,
//   getRecommendations,
//   getRecommendationsError,
//   getRecommendationsStatus,
// } from "../../../redux/slice/productSlice";
// import ProductCard from "../product/ProductCard";

// const Foryou = ({ userId }) => {
//   const dispatch = useDispatch();
//   const data = useSelector(getRecommendations);
//   const status = useSelector(getRecommendationsStatus);
//   const error = useSelector(getRecommendationsError);

//   useEffect(() => {
//     if (data.length === 0) {
//       dispatch(fetchRecommendation(userId));
//     }
//   }, []);

//   return (
//     <div className="container main-container sm:pt-16 pt-12">
//       <h2 className="heading2">Our Top Picks for You</h2>
//       {status === "loading" ? <p>Loading...</p> : null}
//       {status === "failed" ? <p>{error}</p> : null}
//       {status === "success" ? (
//         <div className="grid-list-4 w-full">
//           {data.map((entry) => (
//             <ProductCard key={entry._id} data={entry} />
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Foryou;
import React, { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";

const dummyRecommendations = [
  {
    _id: "1",
    title: "Bluetooth Wireless Earbuds",
    price: 1999,
    imageURL: "https://via.placeholder.com/200?text=Earbuds",
    rating: 4.3
  },
  {
    _id: "2",
    title: "Smart Fitness Watch",
    price: 3499,
    imageURL: "https://via.placeholder.com/200?text=Smartwatch",
    rating: 4.5
  },
  {
    _id: "3",
    title: "Portable Bluetooth Speaker",
    price: 2799,
    imageURL: "https://via.placeholder.com/200?text=Speaker",
    rating: 4.4
  },
  {
    _id: "4",
    title: "Wireless Gaming Mouse",
    price: 1499,
    imageURL: "https://via.placeholder.com/200?text=Gaming+Mouse",
    rating: 4.6
  }
];

const Foryou = ({ userId }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | failed
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(dummyRecommendations);
        setStatus("success");
      } catch (err) {
        setError("Failed to fetch recommendations");
        setStatus("failed");
      }
    };

    if (data.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Our Top Picks for You</h2>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}
      {status === "success" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((entry) => (
            <ProductCard key={entry._id} data={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Foryou;
